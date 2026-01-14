"use client";

export default function BeamAnimation() {
  const squares = Array.from({ length: 500 }, (_, i) => i);
  
  return (
    <div className="relative h-4 overflow-hidden flex w-full items-center justify-center gap-[3px] bg-zinc-950">
      {squares.map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-zinc-800 animate-square-wave flex-shrink-0"
          style={{
            animationDelay: `${(i / 500) * 8}s`,
            animationDuration: '8s',
            borderRadius: '1px'
          }}
        />
      ))}
    </div>
  );
}
