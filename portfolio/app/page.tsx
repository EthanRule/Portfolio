"use client";
import { useState } from "react";

export default function Home() {
  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Rudarz.com",
      description:
        "Professional evergreen guide for the Balance Druid specialization in World of Warcraft. 5 years of coaching experience, iteration, and sweat went into this guide.",
      tags: ["React", "Tailwind CSS", "TypeScript"],
      image: "/Project-Images/Rudarz.com.png",
    },
    {
      id: 2,
      title: "AI Shot Detection",
      description:
        "Android Mobile App using AI to detect in real-time when a player has made or missed a basketball shot. Backend focused.",
      tags: ["Google MediaPipe", "Roboflow", "Kotlin"],
      image: "/Project-Images/ai-shot-tracker.png",
    },
    {
      id: 3,
      title: "AutoVideos",
      description:
        "Automatic video creation pipeline that generates highlight reels from a collection of twitch clips.",
      tags: ["FFmpeg", "Python", "Google APIs"],
      image: "/Project-Images/AutoVideos.png",
    },
    {
      id: 4,
      title: "Lockout",
      description:
        "Fake casting addon for predicting interrupts in World of Warcraft.",
      tags: ["Lua"],
      image: "/Project-Images/Lockout.png",
    },
    {
      id: 5,
      title: "Strategist",
      description:
        "Addon for mapping strategies to matchup's. Never forget what to do.",
      tags: ["Lua"],
      image: "/Project-Images/Strategist.png",
    },
    {
      id: 6,
      title: "Video Editing",
      description: "Editing for YouTube Channels: Palumor, Mvq, and Rudarz.",
      tags: ["Filmora", "Adobe Premiere Pro", "Photoshop"],
      image: "/Project-Images/Editing.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 shadow-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-3">Ethan Rule</h1>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto">
            Software Engineer & Web Developer
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-101 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-zinc-800"
            >
              {/* Project Image or Placeholder */}
              <div className="h-48 bg-black relative">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                    Project Image
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Ethan Rule</h2>
              <p className="text-zinc-400 mt-1">
                Portfolio © {new Date().getFullYear()}
              </p>
            </div>

            <div className="flex space-x-6">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
