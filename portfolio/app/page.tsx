"use client";
import { useState, useEffect } from "react";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  // State for client-side rendering to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState("2023");
  // State to control the video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Update year after component mounts on client side
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Rudarz.com",
      description: "The #1 Balance Druid PvP Guide.",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      image: "/Project-Images/Rudarz.com.png",
    },
    {
      id: 2,
      title: "AI Shot Detection App",
      description: "AI basketball shot make/miss Android app.",
      tags: ["Google MediaPipe", "Roboflow", "Kotlin"],
      image: "/Project-Images/ai-shot-tracker.png",
    },
    // {
    //   id: 3,
    //   title: "AutoVideos",
    //   description: "Semi-automatic Twitch clip to YouTube video generator.",
    //   tags: ["FFmpeg", "Python", "Google APIs"],
    //   image: "/Project-Images/AutoVideos.png",
    // },
    {
      id: 4,
      title: "WoW Stats",
      description: "Player percentile and custom score calculator for WoW.",
      tags: ["Typescript"],
      image: "/Project-Images/wow-stats.png", // This image will show behind the play button
    },
    {
      id: 5,
      title: "Lockout",
      description: "Fake casting addon for predicting interrupts in WoW.",
      tags: ["Lua"],
      image: "/Project-Images/Lockout.png", // This image will show behind the play button
      hasVideo: true,
      videoId: "I7wh98YY7cg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
        {/* Animated accent elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-500 blur-[80px]"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-indigo-500 blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Ethan Rule
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Software Engineer & Web Developer
          </p>

          <div className="flex justify-center space-x-4 pt-2">
            <a
              href="https://github.com/EthanRule"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ethanrule/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/Rudar/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="pb-4 text-4xl font-bold">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-101 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-zinc-800"
            >
              {/* Project Image or Video Thumbnail */}
              <div
                className="h-48 bg-black relative cursor-pointer"
                onClick={() => project.hasVideo && setIsVideoModalOpen(true)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {project.hasVideo && (
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
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
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
                  {project.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex space-x-6 justify-center">
              <a
                href="https://github.com/EthanRule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ethanrule/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://leetcode.com/u/Rudar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <span className="sr-only">LeetCode</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <VideoModal
          videoId="I7wh98YY7cg"
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </div>
  );
}
