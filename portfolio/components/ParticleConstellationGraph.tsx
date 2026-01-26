"use client";
import { useEffect, useRef } from "react";

interface ParticleConstellationProps {
  className?: string;
  style?: React.CSSProperties;
}

const GRID_COLS = 120;
const GRID_ROWS = 80;

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

    let grassGrid: number[][] = [];
    let gridLinesCache: ImageData | null = null;
    let animationFrameId: number;
    let time = 0;
    let lastUpdate = 0;
    const grassColor = `96, 165, 250`;
    const gridColor = `173, 216, 230`;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initializeGrid = () => {
      grassGrid = [];
      for (let row = 0; row < GRID_ROWS; row++) {
        grassGrid[row] = [];
        for (let col = 0; col < GRID_COLS; col++) {
          const height = 0.3 + Math.random() * 0.7;
          grassGrid[row][col] = height;
        }
      }
    };

    const updateGrass = () => {
      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const waveX = Math.sin(time * 0.5 + col * 0.15 + row * 0.1);
          const waveY = Math.cos(time * 0.4 + row * 0.12);
          const sway = (waveX + waveY) * 0.3 + 0.7;
          grassGrid[row][col] = Math.max(0.2, Math.min(1, sway));
        }
      }
    };

    const drawGridLines = () => {
      const cellWidth = canvas.width / GRID_COLS;
      const cellHeight = canvas.height / GRID_ROWS;
      
      ctx.strokeStyle = `rgba(${gridColor}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      for (let col = 1; col < GRID_COLS; col++) {
        const x = col * cellWidth;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      for (let row = 1; row < GRID_ROWS; row++) {
        const y = row * cellHeight;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      ctx.stroke();
    };

    const drawGrid = () => {
      updateGrass();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!gridLinesCache) {
        drawGridLines();
        gridLinesCache = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.putImageData(gridLinesCache, 0, 0);
      }
      
      const cellWidth = canvas.width / GRID_COLS;
      const cellHeight = canvas.height / GRID_ROWS;

      for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          const intensity = grassGrid[row][col];
          const x = col * cellWidth;
          const y = row * cellHeight;
          
          ctx.fillStyle = `rgba(${grassColor}, ${0.4 + intensity * 0.4})`;
          ctx.fillRect(x, y, cellWidth, cellHeight);
        }
      }
    };

    const animate = (currentTime: number) => {
      if (lastUpdate === 0) lastUpdate = currentTime;
      const deltaTime = (currentTime - lastUpdate) / 1000;
      time += deltaTime * 0.5;
      lastUpdate = currentTime;
      drawGrid();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeGrid();
    drawGrid();
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      gridLinesCache = null;
      initializeGrid();
      drawGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ ...style, filter: 'blur(8px)' }} />;
}
