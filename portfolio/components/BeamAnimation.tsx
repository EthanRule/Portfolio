"use client";

export default function BeamAnimation() {
  const squares = Array.from({ length: 500 }, (_, i) => i);
  
  return (
    <div className="relative h-2 bg-zinc-950 overflow-hidden flex gap-0.5 px-1 w-full">
      {squares.map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-zinc-800 animate-square-glow flex-shrink-0"
          style={{
            animationDelay: `${(i / 500) * 8}s`,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );
}
