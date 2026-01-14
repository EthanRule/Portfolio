"use client";
import { useState } from "react";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  websiteUrl?: string;
  isPrivate?: boolean;
}

export default function Project({
  title,
  description,
  tags,
  image,
  images,
  githubUrl,
  websiteUrl,
  isPrivate = false,
}: ProjectProps) {
  const allImages = images && images.length > 0 ? images : [image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = allImages.length > 1;
  const url = websiteUrl || githubUrl;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i === 0 ? allImages.length - 1 : i - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i === allImages.length - 1 ? 0 : i + 1));
  };
  
  const content = (
    <div className="bg-zinc-900/50 overflow-hidden border border-zinc-700 flex flex-col cursor-pointer relative project-card">
      <div className="absolute inset-0 pointer-events-none border-2 border-blue-400 border-sweep-box z-50" />
      <div className="h-64 bg-zinc-950 relative group">
        {allImages.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={title} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {hasMultiple && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center bg-zinc-950 gap-2">
            <button onClick={handlePrev} className="text-white text-lg leading-none hover:text-zinc-300 hover:bg-zinc-800 px-2 flex items-center justify-center flex-shrink-0 bg-zinc-900 transition-colors">‹</button>
            {allImages.map((_, idx) => (
              <button 
                key={idx} 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 rounded-sm flex-1 transition-colors hover:opacity-80 ${idx === currentIndex ? 'bg-blue-400' : 'bg-zinc-500 hover:bg-zinc-400'}`} 
              />
            ))}
            <button onClick={handleNext} className="text-white text-lg leading-none hover:text-zinc-300 hover:bg-zinc-800 px-2 flex items-center justify-center flex-shrink-0 bg-zinc-900 transition-colors">›</button>
          </div>
        )}
      </div>
      <div className="p-4 bg-zinc-800/50">
        <h3 className="text-lg font-mono font-semibold text-zinc-300 tracking-wide">{title}</h3>
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
