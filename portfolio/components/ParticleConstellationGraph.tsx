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

// Configurable constants (easy to tweak)
const PARTICLE_COUNT = 100;
const PARTICLE_TYPES = ["sine", "circle", "lissajous"] as const;
const PARTICLE_SPEED_MIN = 0.04;
const PARTICLE_SPEED_VARIANCE = 0.08; // Math.random() * VAR + MIN
const PARTICLE_SIZE_MIN = 1;
const PARTICLE_SIZE_VARIANCE = 2;
const AMPLITUDE_MIN = 20;
const AMPLITUDE_VARIANCE = 50;
const WRAP_MARGIN = 50;
const DISTANCE_BUCKET_SCALE = 20;
const DETECTION_TOLERANCE = 0.05; // Slightly increased for better detection
const DETECTION_SCORE_THRESHOLD = 0.05; // More permissive for easier detection
const REQUIRED_CONSTELLATION_POINTS = 7;
const COOLDOWN_DURATION = 5000; // ms
const FRAME_TIME_STEP = 0.02;
const FRAME_DETECT_INTERVAL = 1000;

const PARTICLE_BASE_OPACITY = 0.6;
const PARTICLE_OPACITY_VARIANCE = 0.2;

const FADE_IN_DURATION = 2.0;
const STAY_DURATION = 3.0;
const FADE_OUT_DURATION = 2.0;
const FADE_IN_AFTER_CONSTELLATION = 2.0;

const PARTICLE_COLOR = "59, 130, 246"; // rgb
const CONSTELLATION_COLOR = "100, 149, 237"; // rgb (cornflower)
const LINE_WIDTH = 2;
const LINE_SHADOW_BLUR = 10;

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

// Rocket constellation template (normalized coordinates, 7 points) - slightly more flexible
const ROCKET_TEMPLATE = [
  { x: 0.5, y: 0.05, name: "Nose" },
  { x: 0.36, y: 0.22, name: "TopLeft" }, // slightly more variation
  { x: 0.64, y: 0.18, name: "TopRight" }, // asymmetric for easier matching
  { x: 0.66, y: 0.78, name: "BottomRight" }, // slight variations
  { x: 0.34, y: 0.82, name: "BottomLeft" }, // slight variations
  { x: 0.28, y: 0.86, name: "LeftFin" }, // spread fins wider
  { x: 0.72, y: 0.84, name: "RightFin" }, // asymmetric fins
];

// Rocket connections (nose -> body -> fins/engines) - updated for 7 points
const ROCKET_CONNECTIONS: Array<[number, number]> = [
  [0, 1], // Nose -> TopLeft
  [0, 2], // Nose -> TopRight
  [1, 2], // TopLeft -> TopRight
  [1, 4], // TopLeft -> BottomLeft
  [2, 3], // TopRight -> BottomRight
  [3, 4], // BottomRight -> BottomLeft
  [4, 5], // BottomLeft -> LeftFin
  [3, 6], // BottomRight -> RightFin
  [5, 6], // LeftFin -> RightFin
];

// Binary Tree constellation template (Computer Science)
const BINARY_TREE_TEMPLATE = [
  { x: 0.5, y: 0.1, name: "Root" },
  { x: 0.3, y: 0.4, name: "LeftChild" },
  { x: 0.7, y: 0.4, name: "RightChild" },
  { x: 0.15, y: 0.7, name: "LeftLeft" },
  { x: 0.45, y: 0.7, name: "LeftRight" },
  { x: 0.55, y: 0.7, name: "RightLeft" },
  { x: 0.85, y: 0.7, name: "RightRight" },
];

const BINARY_TREE_CONNECTIONS: Array<[number, number]> = [
  [0, 1], // Root -> LeftChild
  [0, 2], // Root -> RightChild
  [1, 3], // LeftChild -> LeftLeft
  [1, 4], // LeftChild -> LeftRight
  [2, 5], // RightChild -> RightLeft
  [2, 6], // RightChild -> RightRight
];

// Sorting Array constellation (Algorithm Visualization)
const SORTING_ARRAY_TEMPLATE = [
  { x: 0.1, y: 0.8, name: "Bar1" },
  { x: 0.25, y: 0.4, name: "Bar2" },
  { x: 0.4, y: 0.9, name: "Bar3" },
  { x: 0.55, y: 0.2, name: "Bar4" },
  { x: 0.7, y: 0.6, name: "Bar5" },
  { x: 0.85, y: 0.3, name: "Bar6" },
  { x: 0.5, y: 0.05, name: "Pivot" },
];

const SORTING_ARRAY_CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5], // Array elements
  [6, 3],
  [6, 1],
  [6, 4], // Pivot connections
];

// Network Graph constellation (Distributed Systems)
const NETWORK_GRAPH_TEMPLATE = [
  { x: 0.5, y: 0.2, name: "ServerA" },
  { x: 0.2, y: 0.5, name: "NodeB" },
  { x: 0.8, y: 0.5, name: "NodeC" },
  { x: 0.35, y: 0.8, name: "ClientD" },
  { x: 0.65, y: 0.8, name: "ClientE" },
  { x: 0.1, y: 0.2, name: "EdgeF" },
  { x: 0.9, y: 0.2, name: "EdgeG" },
];

const NETWORK_GRAPH_CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [0, 2], // Server to nodes
  [1, 3],
  [2, 4], // Nodes to clients
  [1, 2], // Inter-node
  [5, 1],
  [6, 2], // Edge connections
  [3, 4], // Client-to-client
];

// Lambda Symbol constellation (Functional Programming)
const LAMBDA_TEMPLATE = [
  { x: 0.3, y: 0.1, name: "TopLeft" },
  { x: 0.4, y: 0.4, name: "MidLeft" },
  { x: 0.5, y: 0.7, name: "Center" },
  { x: 0.6, y: 0.4, name: "MidRight" },
  { x: 0.7, y: 0.1, name: "TopRight" },
  { x: 0.25, y: 0.9, name: "BottomLeft" },
  { x: 0.75, y: 0.9, name: "BottomRight" },
];

const LAMBDA_CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [1, 2], // Left side of lambda
  [2, 3],
  [3, 4], // Right side of lambda
  [2, 5],
  [2, 6], // Bottom extensions
];

// Tree constellation template (7 points) - organic branching pattern
const TREE_TEMPLATE = [
  { x: 0.5, y: 0.9, name: "Root" }, // base/trunk
  { x: 0.5, y: 0.65, name: "Trunk" }, // middle trunk
  { x: 0.35, y: 0.45, name: "LeftBranch" }, // left main branch
  { x: 0.65, y: 0.4, name: "RightBranch" }, // right main branch
  { x: 0.25, y: 0.2, name: "LeftLeaf" }, // left leaf cluster
  { x: 0.55, y: 0.15, name: "TopLeaf" }, // top leaf cluster
  { x: 0.8, y: 0.25, name: "RightLeaf" }, // right leaf cluster
];

// Tree connections (organic branching)
const TREE_CONNECTIONS: Array<[number, number]> = [
  [0, 1], // Root -> Trunk
  [1, 2], // Trunk -> LeftBranch
  [1, 3], // Trunk -> RightBranch
  [2, 4], // LeftBranch -> LeftLeaf
  [2, 5], // LeftBranch -> TopLeaf
  [3, 5], // RightBranch -> TopLeaf
  [3, 6], // RightBranch -> RightLeaf
];

// Diamond constellation template (7 points) - geometric crystal shape
const DIAMOND_TEMPLATE = [
  { x: 0.5, y: 0.1, name: "TopPoint" }, // top vertex
  { x: 0.25, y: 0.35, name: "TopLeft" }, // upper left
  { x: 0.75, y: 0.35, name: "TopRight" }, // upper right
  { x: 0.15, y: 0.65, name: "LeftPoint" }, // left vertex
  { x: 0.85, y: 0.65, name: "RightPoint" }, // right vertex
  { x: 0.35, y: 0.85, name: "BottomLeft" }, // lower left
  { x: 0.65, y: 0.85, name: "BottomRight" }, // lower right
];

// Diamond connections (crystal facet pattern)
const DIAMOND_CONNECTIONS: Array<[number, number]> = [
  [0, 1], // TopPoint -> TopLeft
  [0, 2], // TopPoint -> TopRight
  [1, 3], // TopLeft -> LeftPoint
  [2, 4], // TopRight -> RightPoint
  [3, 5], // LeftPoint -> BottomLeft
  [4, 6], // RightPoint -> BottomRight
  [5, 6], // BottomLeft -> BottomRight
  [1, 2], // TopLeft -> TopRight (horizontal)
];

// Precomputed normalized distance matrices for template matching
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

const ROCKET_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < ROCKET_TEMPLATE.length; i++) {
  ROCKET_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < ROCKET_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = ROCKET_TEMPLATE[i].x - ROCKET_TEMPLATE[j].x;
      const dy = ROCKET_TEMPLATE[i].y - ROCKET_TEMPLATE[j].y;
      ROCKET_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      ROCKET_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

// Pre-compute Binary Tree template distances
const BINARY_TREE_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < BINARY_TREE_TEMPLATE.length; i++) {
  BINARY_TREE_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < BINARY_TREE_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = BINARY_TREE_TEMPLATE[i].x - BINARY_TREE_TEMPLATE[j].x;
      const dy = BINARY_TREE_TEMPLATE[i].y - BINARY_TREE_TEMPLATE[j].y;
      BINARY_TREE_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      BINARY_TREE_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

// Pre-compute Sorting Array template distances
const SORTING_ARRAY_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < SORTING_ARRAY_TEMPLATE.length; i++) {
  SORTING_ARRAY_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < SORTING_ARRAY_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = SORTING_ARRAY_TEMPLATE[i].x - SORTING_ARRAY_TEMPLATE[j].x;
      const dy = SORTING_ARRAY_TEMPLATE[i].y - SORTING_ARRAY_TEMPLATE[j].y;
      SORTING_ARRAY_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      SORTING_ARRAY_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

// Pre-compute Network Graph template distances
const NETWORK_GRAPH_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < NETWORK_GRAPH_TEMPLATE.length; i++) {
  NETWORK_GRAPH_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < NETWORK_GRAPH_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = NETWORK_GRAPH_TEMPLATE[i].x - NETWORK_GRAPH_TEMPLATE[j].x;
      const dy = NETWORK_GRAPH_TEMPLATE[i].y - NETWORK_GRAPH_TEMPLATE[j].y;
      NETWORK_GRAPH_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      NETWORK_GRAPH_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

// Pre-compute Lambda template distances
const LAMBDA_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < LAMBDA_TEMPLATE.length; i++) {
  LAMBDA_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < LAMBDA_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = LAMBDA_TEMPLATE[i].x - LAMBDA_TEMPLATE[j].x;
      const dy = LAMBDA_TEMPLATE[i].y - LAMBDA_TEMPLATE[j].y;
      LAMBDA_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      LAMBDA_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

const TREE_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < TREE_TEMPLATE.length; i++) {
  TREE_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < TREE_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = TREE_TEMPLATE[i].x - TREE_TEMPLATE[j].x;
      const dy = TREE_TEMPLATE[i].y - TREE_TEMPLATE[j].y;
      TREE_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      TREE_TEMPLATE_DISTANCES[i][j] = 0;
    }
  }
}

const DIAMOND_TEMPLATE_DISTANCES: number[][] = [];
for (let i = 0; i < DIAMOND_TEMPLATE.length; i++) {
  DIAMOND_TEMPLATE_DISTANCES[i] = [];
  for (let j = 0; j < DIAMOND_TEMPLATE.length; j++) {
    if (i !== j) {
      const dx = DIAMOND_TEMPLATE[i].x - DIAMOND_TEMPLATE[j].x;
      const dy = DIAMOND_TEMPLATE[i].y - DIAMOND_TEMPLATE[j].y;
      DIAMOND_TEMPLATE_DISTANCES[i][j] = Math.sqrt(dx * dx + dy * dy);
    } else {
      DIAMOND_TEMPLATE_DISTANCES[i][j] = 0;
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
        connections: BIG_DIPPER_CONNECTIONS,
      },
      {
        name: "Rocket",
        points: [],
        connections: ROCKET_CONNECTIONS,
      },
      {
        name: "Binary Tree",
        points: [],
        connections: BINARY_TREE_CONNECTIONS,
      },
      {
        name: "Sorting Algorithm",
        points: [],
        connections: SORTING_ARRAY_CONNECTIONS,
      },
      {
        name: "Network Graph",
        points: [],
        connections: NETWORK_GRAPH_CONNECTIONS,
      },
      {
        name: "Lambda Function",
        points: [],
        connections: LAMBDA_CONNECTIONS,
      },
      {
        name: "Tree",
        points: [],
        connections: TREE_CONNECTIONS,
      },
      {
        name: "Diamond",
        points: [],
        connections: DIAMOND_CONNECTIONS,
      },
    ];

    let detectedConstellation: DetectedConstellation | null = null;

    // Create particles using helper function
    const createParticles = (count: number): Particle[] => {
      const particles: Particle[] = [];
      const types: Array<"sine" | "circle" | "lissajous"> =
        PARTICLE_TYPES as any;

      for (let i = 0; i < count; i++) {
        const speed =
          Math.random() * PARTICLE_SPEED_VARIANCE + PARTICLE_SPEED_MIN;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * PARTICLE_SIZE_VARIANCE + PARTICLE_SIZE_MIN,
          speed: speed,
          originalSpeed: speed,
          phase: Math.random() * Math.PI * 2,
          type: types[Math.floor(Math.random() * types.length)],
          amplitude: Math.random() * AMPLITUDE_VARIANCE + AMPLITUDE_MIN,
          isInConstellation: false,
          constellationBrightness: 0,
        });
      }
      return particles;
    };

    const particles = createParticles(PARTICLE_COUNT);

    let time = 0;
    let frameCount = 0;
    let lastConstellationEndTime = 0;

    // Particle movement helper functions
    const updateParticlePosition = (particle: Particle, time: number) => {
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
    };

    const wrapParticlePosition = (particle: Particle) => {
      if (particle.x > canvas.width + WRAP_MARGIN)
        particle.baseX = -WRAP_MARGIN;
      if (particle.x < -WRAP_MARGIN)
        particle.baseX = canvas.width + WRAP_MARGIN;
      if (particle.y > canvas.height + WRAP_MARGIN)
        particle.baseY = -WRAP_MARGIN;
      if (particle.y < -WRAP_MARGIN)
        particle.baseY = canvas.height + WRAP_MARGIN;
    };

    // Constellation detection using distance fingerprinting
    // Distance calculation helper functions
    const computeNormalizedDistance = (
      p1: Particle,
      p2: Particle,
      referenceSize: number
    ): number => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy) / referenceSize;
    };

    const buildDistanceIndex = (
      particles: Particle[],
      referenceSize: number
    ) => {
      const distances = new Map<string, number>();
      const distanceIndex = new Map<number, Array<[Particle, Particle]>>();

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const normalizedDist = computeNormalizedDistance(
            particles[i],
            particles[j],
            referenceSize
          );
          const key = `${i},${j}`;
          distances.set(key, normalizedDist);
          const bucket = Math.floor(normalizedDist * DISTANCE_BUCKET_SCALE);
          if (!distanceIndex.has(bucket)) {
            distanceIndex.set(bucket, []);
          }
          distanceIndex.get(bucket)!.push([particles[i], particles[j]]);
        }
      }

      return { distances, distanceIndex };
    };

    const findMatchingDistance = (
      templateDist: number,
      distanceIndex: Map<number, Array<[Particle, Particle]>>,
      tolerance: number,
      referenceSize: number
    ): Array<[Particle, Particle]> => {
      const targetBucket = Math.floor(templateDist * DISTANCE_BUCKET_SCALE);
      const matchingPairs: Array<[Particle, Particle]> = [];

      for (
        let bucket = targetBucket - 1;
        bucket <= targetBucket + 1;
        bucket++
      ) {
        const pairs = distanceIndex.get(bucket) || [];
        for (const [p1, p2] of pairs) {
          const actualDist = computeNormalizedDistance(p1, p2, referenceSize);
          if (Math.abs(actualDist - templateDist) / templateDist <= tolerance) {
            matchingPairs.push([p1, p2]);
          }
        }
      }

      return matchingPairs;
    };

    const detectTemplate = (
      templateDistances: number[][],
      requiredCount: number
    ): Particle[] | null => {
      const availableParticles = particles.filter((p) => !p.isInConstellation);
      if (availableParticles.length < requiredCount) return null;

      const referenceSize = Math.min(canvas.width, canvas.height);
      const tolerance = DETECTION_TOLERANCE;
      const { distanceIndex } = buildDistanceIndex(
        availableParticles,
        referenceSize
      );

      // Find candidates by matching template distances
      const candidateGroups: Particle[][] = [];

      for (
        let templateI = 0;
        templateI < templateDistances.length;
        templateI++
      ) {
        for (
          let templateJ = templateI + 1;
          templateJ < templateDistances.length;
          templateJ++
        ) {
          const templateDist = templateDistances[templateI][templateJ];
          const matchingPairs = findMatchingDistance(
            templateDist,
            distanceIndex,
            tolerance,
            referenceSize
          );

          for (const [p1, p2] of matchingPairs) {
            const candidate = expandToConstellation(
              p1,
              p2,
              templateI,
              templateJ,
              availableParticles,
              referenceSize,
              tolerance,
              templateDistances,
              templateDistances.length
            );
            if (candidate && candidate.length === requiredCount) {
              candidateGroups.push(candidate);
            }
          }
        }
      }

      // Find best candidate
      let bestCandidate: Particle[] | null = null;
      let bestScore = Infinity;

      for (const candidate of candidateGroups) {
        const score = calculateConstellationScore(
          candidate,
          referenceSize,
          templateDistances
        );
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = candidate;
        }
      }

      return bestScore < DETECTION_SCORE_THRESHOLD ? bestCandidate : null;
    };

    // Enhanced detection function with custom tolerance for rocket constellation
    const detectTemplateWithTolerance = (
      templateDistances: number[][],
      requiredCount: number,
      customTolerance: number
    ): Particle[] | null => {
      const availableParticles = particles.filter((p) => !p.isInConstellation);
      if (availableParticles.length < requiredCount) return null;

      const referenceSize = Math.min(canvas.width, canvas.height);
      const tolerance = customTolerance;
      const { distanceIndex } = buildDistanceIndex(
        availableParticles,
        referenceSize
      );

      // Find candidates by matching template distances
      const candidateGroups: Particle[][] = [];

      for (
        let templateI = 0;
        templateI < templateDistances.length;
        templateI++
      ) {
        for (
          let templateJ = templateI + 1;
          templateJ < templateDistances.length;
          templateJ++
        ) {
          const templateDist = templateDistances[templateI][templateJ];
          const matchingPairs = findMatchingDistance(
            templateDist,
            distanceIndex,
            tolerance,
            referenceSize
          );

          for (const [p1, p2] of matchingPairs) {
            const candidate = expandToConstellation(
              p1,
              p2,
              templateI,
              templateJ,
              availableParticles,
              referenceSize,
              tolerance,
              templateDistances,
              templateDistances.length
            );
            if (candidate && candidate.length === requiredCount) {
              candidateGroups.push(candidate);
            }
          }
        }
      }

      // Find best candidate
      let bestCandidate: Particle[] | null = null;
      let bestScore = Infinity;

      for (const candidate of candidateGroups) {
        const score = calculateConstellationScore(
          candidate,
          referenceSize,
          templateDistances
        );
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = candidate;
        }
      }

      return bestScore < DETECTION_SCORE_THRESHOLD ? bestCandidate : null;
    };

    // Helper function to find best particle match for a template position
    const findBestParticleMatch = (
      templateIdx: number,
      constellation: Array<Particle | null>,
      remaining: Particle[],
      referenceSize: number,
      tolerance: number,
      templateDistances: number[][],
      templateLength: number
    ): { particle: Particle | null; error: number } => {
      let bestMatch: Particle | null = null;
      let bestError = Infinity;

      for (const candidate of remaining) {
        let totalError = 0;
        let validDistances = 0;
        for (let placedIdx = 0; placedIdx < templateLength; placedIdx++) {
          if (constellation[placedIdx] === null) continue;

          const templateDist = templateDistances[templateIdx][placedIdx];
          const actualDist = computeNormalizedDistance(
            candidate,
            constellation[placedIdx]!,
            referenceSize
          );
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

      return { particle: bestMatch, error: bestError };
    };

    // Simplified expand to constellation function
    const expandToConstellation = (
      anchor1: Particle,
      anchor2: Particle,
      templateIdx1: number,
      templateIdx2: number,
      availableParticles: Particle[],
      referenceSize: number,
      tolerance: number,
      templateDistances: number[][],
      templateLength: number
    ): Particle[] | null => {
      const constellation = new Array(templateLength).fill(null);
      constellation[templateIdx1] = anchor1;
      constellation[templateIdx2] = anchor2;

      const remaining = availableParticles.filter(
        (p) => p !== anchor1 && p !== anchor2
      );

      for (let templateIdx = 0; templateIdx < templateLength; templateIdx++) {
        if (constellation[templateIdx] !== null) continue;

        const { particle: bestMatch } = findBestParticleMatch(
          templateIdx,
          constellation,
          remaining,
          referenceSize,
          tolerance,
          templateDistances,
          templateLength
        );

        if (bestMatch === null) return null;

        constellation[templateIdx] = bestMatch;
        const matchIndex = remaining.indexOf(bestMatch);
        if (matchIndex > -1) remaining.splice(matchIndex, 1);
      }

      return constellation.filter((p) => p !== null) as Particle[];
    };

    // Calculate RMS error between candidate and template
    const calculateConstellationScore = (
      candidate: Particle[],
      referenceSize: number,
      templateDistances: number[][]
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
          const templateDist = templateDistances[i][j];
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

    // Constellation state management helpers
    const freezeParticlesInConstellation = (
      particles: Particle[],
      time: number
    ) => {
      particles.forEach((particle) => {
        particle.isInConstellation = true;
        particle.frozenX = particle.x;
        particle.frozenY = particle.y;
        particle.frozenBaseX = particle.baseX;
        particle.frozenBaseY = particle.baseY;
        particle.frozenTime = time;
        particle.speed = 0;
        particle.constellationBrightness = 1;
      });
    };

    const unfreezeParticlesFromConstellation = (
      particles: Particle[],
      time: number
    ) => {
      particles.forEach((p) => {
        p.isInConstellation = false;
        p.speed = p.originalSpeed;
        p.constellationBrightness = 0;

        if (p.frozenBaseX !== undefined && p.frozenBaseY !== undefined) {
          p.baseX = p.frozenBaseX;
          p.baseY = p.frozenBaseY;
        }

        p.isFadingIn = true;
        p.fadeInStartTime = time;

        // Clear frozen state
        p.frozenX = undefined;
        p.frozenY = undefined;
        p.frozenBaseX = undefined;
        p.frozenBaseY = undefined;
        p.frozenTime = undefined;
      });
    };

    const checkConstellationExpiration = () => {
      if (!detectedConstellation || !detectedConstellation.isActive) return;

      const elapsedTime = time - detectedConstellation.startTime;

      if (elapsedTime > 7.0) {
        detectedConstellation.isActive = false;
        lastConstellationEndTime = performance.now();
        unfreezeParticlesFromConstellation(
          detectedConstellation.particles,
          time
        );
        detectedConstellation = null;
      }
    };

    const detectConstellation = () => {
      if (time < 3.0) return;

      // Define all constellation templates with their info
      const constellationTemplates = [
        {
          name: "Big Dipper",
          template: TEMPLATE_DISTANCES,
          pattern: constellations[0],
          emoji: "⭐",
          tolerance: DETECTION_TOLERANCE,
        },
        {
          name: "Rocket",
          template: ROCKET_TEMPLATE_DISTANCES,
          pattern: constellations[1],
          emoji: "🚀",
          tolerance: DETECTION_TOLERANCE * 1.5, // More relaxed for complex shape
        },
        {
          name: "Binary Tree",
          template: BINARY_TREE_TEMPLATE_DISTANCES,
          pattern: constellations[2],
          emoji: "�",
          tolerance: DETECTION_TOLERANCE * 1.4, // CS algorithms need flexibility
        },
        {
          name: "Sorting Algorithm",
          template: SORTING_ARRAY_TEMPLATE_DISTANCES,
          pattern: constellations[3],
          emoji: "📊",
          tolerance: DETECTION_TOLERANCE * 1.6, // Array patterns are varied
        },
        {
          name: "Network Graph",
          template: NETWORK_GRAPH_TEMPLATE_DISTANCES,
          pattern: constellations[4],
          emoji: "🌐",
          tolerance: DETECTION_TOLERANCE * 1.7, // Network topology flexible
        },
        {
          name: "Lambda Function",
          template: LAMBDA_TEMPLATE_DISTANCES,
          pattern: constellations[5],
          emoji: "λ",
          tolerance: DETECTION_TOLERANCE * 1.3, // Mathematical symbol
        },
        {
          name: "Tree",
          template: TREE_TEMPLATE_DISTANCES,
          pattern: constellations[6],
          emoji: "�🌲",
          tolerance: DETECTION_TOLERANCE * 1.3, // Slightly relaxed for organic shape
        },
        {
          name: "Diamond",
          template: DIAMOND_TEMPLATE_DISTANCES,
          pattern: constellations[7],
          emoji: "💎",
          tolerance: DETECTION_TOLERANCE * 1.2, // Slightly relaxed for geometric precision
        },
      ];

      // Shuffle the array to try constellations in random order
      const shuffledTemplates = [...constellationTemplates].sort(
        () => Math.random() - 0.5
      );

      let detectedStars: Particle[] | null = null;
      let selectedPattern: ConstellationPattern = constellations[0];
      let selectedEmoji = "⭐";

      // Try each constellation template until one is detected
      for (const template of shuffledTemplates) {
        detectedStars = detectTemplateWithTolerance(
          template.template,
          7,
          template.tolerance
        );
        if (detectedStars) {
          console.log(
            `${template.emoji} ${template.name} constellation detected!`
          );
          selectedPattern = template.pattern;
          selectedEmoji = template.emoji;
          break;
        }
      }

      if (detectedStars) {
        detectedConstellation = {
          pattern: selectedPattern,
          particles: detectedStars,
          startTime: time,
          isActive: true,
        };

        freezeParticlesInConstellation(detectedStars, time);
      }
    };

    // Rendering helper functions
    const calculateParticleOpacity = (
      particle: Particle,
      time: number,
      index: number
    ): number => {
      const baseOpacity =
        PARTICLE_BASE_OPACITY +
        Math.sin(time * 2 + index) * PARTICLE_OPACITY_VARIANCE;

      // Calculate constellation glow with fade timing
      let constellationGlow = 0;
      if (
        particle.isInConstellation &&
        detectedConstellation &&
        detectedConstellation.isActive
      ) {
        const elapsedTime = time - detectedConstellation.startTime;
        const fadeOpacity = getConstellationOpacity(elapsedTime);
        constellationGlow = fadeOpacity * 0.8;
      }

      // Handle fade-in after constellation ends
      let fadeInMultiplier = 1;
      if (particle.isFadingIn && particle.fadeInStartTime !== undefined) {
        const fadeInElapsed = time - particle.fadeInStartTime;

        if (fadeInElapsed < FADE_IN_AFTER_CONSTELLATION) {
          fadeInMultiplier = fadeInElapsed / FADE_IN_AFTER_CONSTELLATION;
        } else {
          particle.isFadingIn = false;
          particle.fadeInStartTime = undefined;
          fadeInMultiplier = 1;
        }
      }

      return Math.min((baseOpacity + constellationGlow) * fadeInMultiplier, 1);
    };

    const createParticleGradient = (
      particle: Particle,
      opacity: number
    ): CanvasGradient => {
      const particleSize = particle.isInConstellation
        ? particle.size * (1 + (opacity - PARTICLE_BASE_OPACITY) * 2)
        : particle.size;

      const glowRadius = particle.isInConstellation
        ? particleSize * (3 + (opacity - PARTICLE_BASE_OPACITY) * 4)
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
        gradient.addColorStop(0, `rgba(${CONSTELLATION_COLOR}, ${opacity})`);
        gradient.addColorStop(
          0.3,
          `rgba(${CONSTELLATION_COLOR}, ${opacity * 0.8})`
        );
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      } else {
        gradient.addColorStop(0, `rgba(${PARTICLE_COLOR}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${PARTICLE_COLOR}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`);
      }

      return gradient;
    };

    const renderParticle = (
      particle: Particle,
      time: number,
      index: number
    ) => {
      const opacity = calculateParticleOpacity(particle, time, index);
      const particleSize = particle.isInConstellation
        ? particle.size * (1 + (opacity - 0.6) * 2)
        : particle.size;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
      ctx.fillStyle = createParticleGradient(particle, opacity);
      ctx.fill();
    };

    const renderConstellationLines = (time: number) => {
      if (!detectedConstellation || !detectedConstellation.isActive) return;

      const elapsedTime = time - detectedConstellation.startTime;
      const opacity = getConstellationOpacity(elapsedTime);

      ctx.strokeStyle = `rgba(${CONSTELLATION_COLOR}, ${opacity * 0.8})`;
      ctx.lineWidth = LINE_WIDTH;
      ctx.shadowColor = `rgba(${CONSTELLATION_COLOR}, ${opacity * 0.5})`;
      ctx.shadowBlur = LINE_SHADOW_BLUR;

      for (const [startIdx, endIdx] of detectedConstellation.pattern
        .connections) {
        const startParticle = detectedConstellation.particles[startIdx];
        const endParticle = detectedConstellation.particles[endIdx];

        if (startParticle && endParticle) {
          ctx.beginPath();
          ctx.moveTo(startParticle.x, startParticle.y);
          ctx.lineTo(endParticle.x, endParticle.y);
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += FRAME_TIME_STEP;
      frameCount++;

      // Real-time cooldown checking
      const currentTime = performance.now();
      const timeSinceLastConstellation = currentTime - lastConstellationEndTime;
      const isInCooldown =
        timeSinceLastConstellation < COOLDOWN_DURATION &&
        lastConstellationEndTime > 0;

      // Check constellation state
      if (detectedConstellation && detectedConstellation.isActive) {
        checkConstellationExpiration();
      }

      // Detect new constellations periodically when not in cooldown
      if (
        frameCount % FRAME_DETECT_INTERVAL === 0 &&
        !isInCooldown &&
        !detectedConstellation
      ) {
        detectConstellation();
      }

      // Update all particles
      particles.forEach((particle, index) => {
        if (
          particle.isInConstellation &&
          particle.frozenX !== undefined &&
          particle.frozenY !== undefined
        ) {
          particle.x = particle.frozenX;
          particle.y = particle.frozenY;
        } else if (!particle.isInConstellation) {
          updateParticlePosition(particle, time);
          wrapParticlePosition(particle);
        }

        renderParticle(particle, time, index);
      });

      // Render constellation connections
      renderConstellationLines(time);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={style} />;
}
