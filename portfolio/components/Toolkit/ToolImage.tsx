"use client";
import Image from "next/image";

interface ToolImageProps {
  src: string;
  alt: string;
  shadowColor?: string;
}
export function ToolImage({
  src,
  alt,
  shadowColor = "blue-400",
}: ToolImageProps) {
  const shadowClasses: Record<string, string> = {
    "blue-400":
      "shadow-lg shadow-blue-400/50 hover:shadow-xl hover:shadow-blue-400",
    "amber-400":
      "shadow-lg shadow-amber-400/50 hover:shadow-xl hover:shadow-amber-400",
    "purple-800":
      "shadow-lg shadow-purple-800/50 hover:shadow-xl hover:shadow-purple-800",
    white: "shadow-lg shadow-white/50 hover:shadow-xl hover:shadow-white",
    "cyan-400":
      "shadow-lg shadow-cyan-400/50 hover:shadow-xl hover:shadow-cyan-400",
    "cyan-700":
      "shadow-lg shadow-cyan-700/50 hover:shadow-xl hover:shadow-cyan-700",
    "green-500":
      "shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500",
    "blue-600":
      "shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600",
  };

  return (
    <div className="group relative">
      <Image
        src={src}
        alt={alt}
        width={72}
        height={72}
        className={`rounded-xl bg-zinc-800/50 p-2 border border-zinc-700 transition-all duration-300 hover:scale-110 hover:border-zinc-600 ${
          shadowClasses[shadowColor] || shadowClasses["blue-400"]
        }`}
      />
    </div>
  );
}
