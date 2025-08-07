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
  githubUrl?: string;
  demo?: boolean;
  interactive?: boolean;
  beforeAfter?: boolean;
  realtime?: boolean;
  process?: boolean;
  metrics?: boolean;
  fps?: boolean;
  medical?: boolean;
  attention?: boolean;
}

export default function Project({
  title,
  description,
  tags,
  image,
  hasVideo = false,
  videoId,
  githubUrl,
  demo = false,
  interactive = false,
  beforeAfter = false,
  realtime = false,
  process = false,
  metrics = false,
  fps = false,
  medical = false,
  attention = false,
}: ProjectProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 border border-zinc-800 h-96 flex flex-col">
        {/* Project Image or Video Thumbnail */}
        <div
          className={`h-32 bg-black relative flex-shrink-0 ${
            hasVideo ? "cursor-pointer" : ""
          } ${realtime || fps ? "border-green-500 border" : ""} ${
            demo ? "border-blue-500 border" : ""
          } ${interactive ? "border-purple-500 border" : ""}`}
          onClick={() => hasVideo && setIsVideoModalOpen(true)}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />

          {/* Visual indicators for different project types */}
          {realtime && (
            <div className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 rounded text-xs font-bold">
              LIVE
            </div>
          )}
          {demo && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              DEMO
            </div>
          )}
          {fps && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-mono">
              45 FPS
            </div>
          )}
          {metrics && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-mono">
              94.2%
            </div>
          )}

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
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-black text-blue-300 text-xs px-2 py-1 rounded border border-zinc-800"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="bg-black text-gray-400 text-xs px-2 py-1 rounded border border-zinc-800">
                +{tags.length - 3}
              </span>
            )}
          </div>

          {/* Description - Code/Output Style */}
          <div
            className={`flex-1 bg-black p-3 rounded-md border border-zinc-800 text-sm overflow-hidden ${
              demo || interactive ? "font-mono" : ""
            }`}
          >
            <div className="line-clamp-3 text-zinc-300 whitespace-pre-line">
              {description}
            </div>
          </div>

          {/* GitHub Repository Button */}
          {githubUrl && (
            <div className="mt-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 text-sm w-full justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent parent click events
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">View Repository</span>
              </a>
            </div>
          )}
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
