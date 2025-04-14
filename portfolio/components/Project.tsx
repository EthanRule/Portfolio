import { useState } from "react";
import VideoModal from "./VideoModal";

interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  hasVideo?: boolean;
  videoId?: string;
}

export default function Project({
  title,
  description,
  tags,
  image,
  hasVideo = false,
  videoId,
}: ProjectProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-101 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-zinc-800">
        {/* Project Image or Video Thumbnail */}
        <div
          className={`h-48 bg-black relative ${
            hasVideo ? "cursor-pointer" : ""
          }`}
          onClick={() => hasVideo && setIsVideoModalOpen(true)}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-80 flex items-center justify-center transform transition-transform hover:scale-110">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-blue-300 text-xs px-2 py-1 rounded border border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description - Now Always Visible */}
          <div className="mt-4 text-zinc-300 bg-black p-4 rounded-md border border-zinc-800">
            {description}
          </div>
        </div>
      </div>

      {/* Video Modal rendered at root level to avoid containment issues */}
      {isVideoModalOpen && videoId && (
        <VideoModal
          videoId={videoId}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </>
  );
}
