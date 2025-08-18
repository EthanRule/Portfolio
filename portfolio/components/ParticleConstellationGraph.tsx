"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  phase: number;
  type: "sine" | "circle" | "lissajous";
  amplitude: number;
  isInConstellation: boolean;
  originalSpeed: number;
  constellationBrightness: number;
  frozenX?: number;
  frozenY?: number;
  frozenBaseX?: number;
  frozenBaseY?: number;
  frozenTime?: number;
  fadeInStartTime?: number;
  isFadingIn?: boolean;
}

interface ConstellationPattern {
  name: string;
  points: Array<{ x: number; y: number }>;
  connections: Array<[number, number]>;
}

interface DetectedConstellation {
  pattern: ConstellationPattern;
  particles: Particle[];
  startTime: number;
  isActive: boolean;
}

interface ParticleConstellationProps {
  className?: string;
  style?: React.CSSProperties;
}

// Big Dipper constellation template
const BIG_DIPPER_TEMPLATE = [
  { x: 0.1, y: 0.3, name: "Dubhe" },
  { x: 0.3, y: 0.0, name: "Merak" },
  { x: 0.7, y: 0.0, name: "Phecda" },
  { x: 0.9, y: 0.3, name: "Megrez" },
  { x: 1.2, y: 0.5, name: "Alioth" },
  { x: 1.55, y: 0.8, name: "Mizar" }, // nudged outward
  { x: 1.8, y: 0.9, name: "Alkaid" }, // brought slightly inward again
];

// Big Dipper connections (bowl + handle)
const BIG_DIPPER_CONNECTIONS: Array<[number, number]> = [
  [0, 1], // Dubhe -> Merak
  [1, 2], // Merak -> Phecda
  [2, 3], // Phecda -> Megrez
  [3, 0], // Megrez -> Dubhe (close the bowl)
  [3, 4], // Megrez -> Alioth (start handle)
  [4, 5], // Alioth -> Mizar
  [5, 6], // Mizar -> Alkaid
];

// Precomputed normalized distance matrix for template matching
const TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < BIG_DIPPER_TEMPLATE.length; i++) {
  TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < BIG_DIPPER_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = BIG_DIPPER_TEMPLATE[i].x - BIG_DIPPER_TEMPLATE[j].x;
      const dy = BIG_DIPPER_TEMPLATE[i].y - BIG_DIPPER_TEMPLATE[j].y;
      TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

export default function ParticleConstellation({
  className = "absolute inset-0 w-full h-full pointer-events-none opacity-30",
  style = { mixBlendMode: "screen" as const },
}: ParticleConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Define constellation patterns for visualization only
    const constellations: ConstellationPattern[] = [
      {
        name: "Big Dipper",
        points: [], // Not used in graph-based detection
        connections: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 0], // Bowl
          [3, 4],
          [4, 5],
          [5, 6], // Handle
        ],
      },
    ];

    let detectedConstellation: DetectedConstellation | null = null;

    // Create particles
    const particles: Particle[] = [];
    const numParticles = 100; // Reduced for better performance

    for (let i = 0; i < numParticles; i++) {
      const types: Array<"sine" | "circle" | "lissajous"> = [
        "sine",
        "circle",
        "lissajous",
      ];
      const speed = Math.random() * 0.08 + 0.04;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: speed,
        originalSpeed: speed,
        phase: Math.random() * Math.PI * 2,
        type: types[Math.floor(Math.random() * types.length)],
        amplitude: Math.random() * 50 + 20,
        isInConstellation: false,
        constellationBrightness: 0,
      });
    }

    let time = 0;
    let frameCount = 0;
    let lastConstellationEndTime = 0;
    let animationStartTime = performance.now();
    const COOLDOWN_DURATION = 5000;

    // Constellation detection using distance fingerprinting
    const detectBigDipper = (): Particle[] | null => {
      const availableParticles = particles.filter((p) => !p.isInConstellation);
      if (availableParticles.length < 7) return null;

      const referenceSize = Math.min(canvas.width, canvas.height);
      const tolerance = 0.05;

      // Step 1: Compute all pairwise distances O(N²)
      const distances = new Map<string, number>();
      const distanceIndex = new Map<number, Array<[Particle, Particle]>>();

      for (let i = 0; i < availableParticles.length; i++) {
        for (let j = i + 1; j < availableParticles.length; j++) {
          const p1 = availableParticles[i];
          const p2 = availableParticles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const normalizedDist = dist / referenceSize;

          const key = `${i},${j}`;
          distances.set(key, normalizedDist);

          // Index by distance for quick lookups
          const bucket = Math.floor(normalizedDist * 20);
          if (!distanceIndex.has(bucket)) {
            distanceIndex.set(bucket, []);
          }
          distanceIndex.get(bucket)!.push([p1, p2]);
        }
      }

      // Find anchor pairs that match template distances
      const candidateGroups: Particle[][] = [];

      // Try each template distance as an anchor
      for (
        let templateI = 0;
        templateI < TEMPLATE_DISTANCES.length;
        templateI++
      ) {
        for (
          let templateJ = templateI + 1;
          templateJ < TEMPLATE_DISTANCES.length;
          templateJ++
        ) {
          const templateDist = TEMPLATE_DISTANCES[templateI][templateJ];
          const targetBucket = Math.floor(templateDist * 20);

          // Look in nearby buckets for tolerance
          for (
            let bucket = targetBucket - 1;
            bucket <= targetBucket + 1;
            bucket++
          ) {
            const pairs = distanceIndex.get(bucket) || [];

            for (const [p1, p2] of pairs) {
              const actualDist =
                Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) /
                referenceSize;

              if (
                Math.abs(actualDist - templateDist) / templateDist <=
                tolerance
              ) {
                // Try to expand to full constellation
                const candidate = expandToConstellation(
                  p1,
                  p2,
                  templateI,
                  templateJ,
                  availableParticles,
                  referenceSize,
                  tolerance
                );
                if (candidate && candidate.length === 7) {
                  candidateGroups.push(candidate);
                }
              }
            }
          }
        }
      }

      // Step 3: Verify best candidate
      let bestCandidate: Particle[] | null = null;
      let bestScore = Infinity;

      for (const candidate of candidateGroups) {
        const score = calculateConstellationScore(candidate, referenceSize);
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = candidate;
        }
      }

      return bestScore < 0.05 ? bestCandidate : null;
    };

    // Expand anchor pair to full constellation by finding matching distances
    const expandToConstellation = (
      anchor1: Particle,
      anchor2: Particle,
      templateIdx1: number,
      templateIdx2: number,
      availableParticles: Particle[],
      referenceSize: number,
      tolerance: number
    ): Particle[] | null => {
      const constellation = new Array(7).fill(null);
      constellation[templateIdx1] = anchor1;
      constellation[templateIdx2] = anchor2;

      const remaining = availableParticles.filter(
        (p) => p !== anchor1 && p !== anchor2
      );

      // Try to fill remaining positions
      for (let templateIdx = 0; templateIdx < 7; templateIdx++) {
        if (constellation[templateIdx] !== null) continue;

        let bestMatch: Particle | null = null;
        let bestError = Infinity;

        for (const candidate of remaining) {
          let totalError = 0;
          let validDistances = 0;

          // Check distances to already placed particles
          for (let placedIdx = 0; placedIdx < 7; placedIdx++) {
            if (constellation[placedIdx] === null) continue;

            const templateDist = TEMPLATE_DISTANCES[templateIdx][placedIdx];
            const actualDist =
              Math.sqrt(
                (candidate.x - constellation[placedIdx].x) ** 2 +
                  (candidate.y - constellation[placedIdx].y) ** 2
              ) / referenceSize;

            const error = Math.abs(actualDist - templateDist) / templateDist;
            totalError += error;
            validDistances++;
          }

          if (validDistances > 0) {
            const avgError = totalError / validDistances;
            if (avgError < tolerance && avgError < bestError) {
              bestError = avgError;
              bestMatch = candidate;
            }
          }
        }

        if (bestMatch === null) return null; // Can't complete constellation

        constellation[templateIdx] = bestMatch;
        const matchIndex = remaining.indexOf(bestMatch);
        if (matchIndex > -1) remaining.splice(matchIndex, 1);
      }

      return constellation.filter((p) => p !== null) as Particle[];
    };

    // Calculate RMS error between candidate and template
    const calculateConstellationScore = (
      candidate: Particle[],
      referenceSize: number
    ): number => {
      let totalError = 0;
      let comparisons = 0;

      for (let i = 0; i < candidate.length; i++) {
        for (let j = i + 1; j < candidate.length; j++) {
          const actualDist =
            Math.sqrt(
              (candidate[i].x - candidate[j].x) ** 2 +
                (candidate[i].y - candidate[j].y) ** 2
            ) / referenceSize;

          const templateDist = TEMPLATE_DISTANCES[i][j];
          const error = Math.abs(actualDist - templateDist) / templateDist;

          totalError += error * error; // Square for RMS
          comparisons++;
        }
      }

      return Math.sqrt(totalError / comparisons); // Return RMS error
    };

    // Calculate fade intensity for constellation (fade-in, stay, fade-out)
    const getConstellationOpacity = (elapsedTime: number): number => {
      const FADE_IN_DURATION = 2.0;
      const STAY_DURATION = 3.0;
      const FADE_OUT_DURATION = 2.0;

      if (elapsedTime <= FADE_IN_DURATION) {
        // Fade in over 2 seconds
        return elapsedTime / FADE_IN_DURATION;
      } else if (elapsedTime <= FADE_IN_DURATION + STAY_DURATION) {
        // Stay at full brightness for 3 seconds
        return 1.0;
      } else {
        // Fade out over 2 seconds
        const fadeOutProgress = elapsedTime - FADE_IN_DURATION - STAY_DURATION;
        return Math.max(0, 1.0 - fadeOutProgress / FADE_OUT_DURATION);
      }
    };

    // Separate function to handle constellation expiration (always runs regardless of cooldown)
    const checkConstellationExpiration = () => {
      if (!detectedConstellation || !detectedConstellation.isActive) return;

      const elapsedTime = time - detectedConstellation.startTime;

      if (elapsedTime > 7.0) {
        detectedConstellation.isActive = false;
        lastConstellationEndTime = performance.now();

        detectedConstellation.particles.forEach((p) => {
          p.isInConstellation = false;
          p.speed = p.originalSpeed;
          p.constellationBrightness = 0;

          // Restore base positions to where they were when frozen
          if (p.frozenBaseX !== undefined && p.frozenBaseY !== undefined) {
            p.baseX = p.frozenBaseX;
            p.baseY = p.frozenBaseY;
          }

          // Start fade-in process
          p.isFadingIn = true;
          p.fadeInStartTime = time;

          // Clear frozen state
          p.frozenX = undefined;
          p.frozenY = undefined;
          p.frozenBaseX = undefined;
          p.frozenBaseY = undefined;
          p.frozenTime = undefined;
        });
        detectedConstellation = null;
      }
    };

    const detectConstellation = () => {
      if (time < 3.0) return;

      // Remove cooldown and expiration logic from detectConstellation

      const detectedStars = detectBigDipper();

      if (detectedStars) {
        detectedStars.forEach((particle, index) => {
          const starName = [
            "Dubhe",
            "Merak",
            "Phecda",
            "Megrez",
            "Alioth",
            "Mizar",
            "Alkaid",
          ][index];
        });

        detectedConstellation = {
          pattern: constellations[0],
          particles: detectedStars,
          startTime: time,
          isActive: true,
        };

        detectedStars.forEach((particle) => {
          particle.isInConstellation = true;
          particle.frozenX = particle.x;
          particle.frozenY = particle.y;
          particle.frozenBaseX = particle.baseX;
          particle.frozenBaseY = particle.baseY;
          particle.frozenTime = time;
          particle.speed = 0;
          particle.constellationBrightness = 1;
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;
      frameCount++;

      // Real-time cooldown checking
      const currentTime = performance.now();
      const timeSinceLastConstellation = currentTime - lastConstellationEndTime;
      const isInCooldown =
        timeSinceLastConstellation < COOLDOWN_DURATION &&
        lastConstellationEndTime > 0;

      // Check if active constellation should expire
      if (detectedConstellation && detectedConstellation.isActive) {
        checkConstellationExpiration();
      }

      // Detect new constellations when not in cooldown
      if (frameCount % 300 === 0 && !isInCooldown && !detectedConstellation) {
        detectConstellation();
      }

      particles.forEach((particle, index) => {
        // If particle is in constellation, use frozen position
        if (
          particle.isInConstellation &&
          particle.frozenX !== undefined &&
          particle.frozenY !== undefined
        ) {
          particle.x = particle.frozenX;
          particle.y = particle.frozenY;
        } else if (!particle.isInConstellation) {
          // Normal movement logic for non-constellation particles
          switch (particle.type) {
            case "sine":
              particle.x =
                particle.baseX +
                Math.sin(time * particle.speed + particle.phase) *
                  particle.amplitude;
              particle.y =
                particle.baseY +
                Math.cos(time * particle.speed * 0.7 + particle.phase) *
                  particle.amplitude *
                  0.5;
              break;
            case "circle":
              const radius = particle.amplitude;
              particle.x =
                particle.baseX +
                Math.cos(time * particle.speed + particle.phase) * radius;
              particle.y =
                particle.baseY +
                Math.sin(time * particle.speed + particle.phase) * radius;
              break;
            case "lissajous":
              particle.x =
                particle.baseX +
                Math.sin(time * particle.speed + particle.phase) *
                  particle.amplitude;
              particle.y =
                particle.baseY +
                Math.sin(time * particle.speed * 1.5 + particle.phase * 0.5) *
                  particle.amplitude *
                  0.8;
              break;
          }

          if (particle.x > canvas.width + 50) particle.baseX = -50;
          if (particle.x < -50) particle.baseX = canvas.width + 50;
          if (particle.y > canvas.height + 50) particle.baseY = -50;
          if (particle.y < -50) particle.baseY = canvas.height + 50;
        }

        const baseOpacity = 0.6 + Math.sin(time * 2 + index) * 0.2;

        // Calculate constellation glow with fade timing
        let constellationGlow = 0;
        if (
          particle.isInConstellation &&
          detectedConstellation &&
          detectedConstellation.isActive
        ) {
          const elapsedTime = time - detectedConstellation.startTime;
          const fadeOpacity = getConstellationOpacity(elapsedTime);
          constellationGlow = fadeOpacity * 0.8; // Max glow intensity
        }

        // Handle fade-in after constellation ends
        let fadeInMultiplier = 1;
        if (particle.isFadingIn && particle.fadeInStartTime !== undefined) {
          const fadeInDuration = 2.0; // 2 seconds to fade back in
          const fadeInElapsed = time - particle.fadeInStartTime;

          if (fadeInElapsed < fadeInDuration) {
            fadeInMultiplier = fadeInElapsed / fadeInDuration; // 0 to 1 over 2 seconds
          } else {
            // Fade-in complete
            particle.isFadingIn = false;
            particle.fadeInStartTime = undefined;
            fadeInMultiplier = 1;
          }
        }

        const opacity = Math.min(
          (baseOpacity + constellationGlow) * fadeInMultiplier,
          1
        );
        const particleSize = particle.isInConstellation
          ? particle.size * (1 + constellationGlow * 2) // Glow makes particles bigger
          : particle.size;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);

        const glowRadius = particle.isInConstellation
          ? particleSize * (3 + constellationGlow * 4) // Dynamic glow radius based on fade
          : particleSize * 3;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        );

        if (particle.isInConstellation) {
          // White glow effect with blue core for constellation particles
          gradient.addColorStop(0, `rgba(100, 149, 237, ${opacity})`); // Blue core (same as normal)
          gradient.addColorStop(0.3, `rgba(100, 149, 237, ${opacity * 0.8})`); // Blue transition
          gradient.addColorStop(0.7, `rgba(255, 255, 255, ${opacity * 0.6})`); // White glow
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`); // White fade to transparent
        } else {
          // Normal blue particles
          const color = "59, 130, 246";
          gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(${color}, ${opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw constellation connections
      if (detectedConstellation && detectedConstellation.isActive) {
        const elapsedTime = time - detectedConstellation.startTime;
        const opacity = getConstellationOpacity(elapsedTime);

        // Use same blue color as stars for constellation lines
        ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * 0.8})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(100, 149, 237, ${opacity * 0.5})`;
        ctx.shadowBlur = 10;

        for (const [startIdx, endIdx] of BIG_DIPPER_CONNECTIONS) {
          const startParticle = detectedConstellation.particles[startIdx];
          const endParticle = detectedConstellation.particles[endIdx];

          if (startParticle && endParticle) {
            ctx.beginPath();
            ctx.moveTo(startParticle.x, startParticle.y);
            ctx.lineTo(endParticle.x, endParticle.y);
            ctx.stroke();
          }
        }

        ctx.shadowBlur = 0; // Reset shadow
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={style} />;
}
