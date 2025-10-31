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
    "blue-400": "rounded-lg shadow-lg shadow-blue-400",
    "amber-400": "rounded-lg shadow-lg shadow-amber-400",
    "purple-800": "rounded-lg shadow-lg shadow-purple-800",
    white: "rounded-lg shadow-lg shadow-white",
    "cyan-400": "rounded-lg shadow-lg shadow-cyan-400",
    "cyan-700": "rounded-lg shadow-lg shadow-cyan-700",
    "green-500": "rounded-lg shadow-lg shadow-green-500",
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className={shadowClasses[shadowColor] || shadowClasses["blue-400"]}
    />
  );
}
