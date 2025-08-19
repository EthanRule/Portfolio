import { useState } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";

export default function FeaturedProjects() {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Rudarz.com ✅",
      description:
        "Built a course website based on my personal competetion experience, which has helped over 250 players and has generated over $2500 in personal revenue.",
      tags: [
        "Typescript",
        "React",
        "TailwindCSS",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "Next-Auth",
        "Vercel",
      ],
      image: "/Project-Images/Rudarz.com.png",
      websiteUrl: "https://rudarz.com",
      isPrivate: true,
    },
    {
      id: 2,
      title: "AI Shot Detection ✅",
      description:
        "Developed a machine-learning Android app to help basketball players improve their skills. Placed 3rd out of 20 for the Winter 2024 Computer Science Capstone project competetion",
      tags: [
        "Kotlin",
        "Roboflow",
        "Google MediaPipe",
        "Tensorflow",
        "FFmpeg",
        "Android Studio",
      ],
      image: "/Project-Images/ai-shot-tracker.png",
      isPrivate: true,
    },
    {
      id: 3,
      title: "Rust Database Engine",
      description:
        "Engineered a partial custom document based database engine in Rust using BTree-backed storage system and BSON serialization. Also built two Rust web servers pinned on my GitHub.",
      tags: ["Rust", "Cargo"],
      image: "/Project-Images/rust.png",
      githubUrl: "https://github.com/EthanRule/rust_database_engine",
      isPrivate: false,
    },
    {
      id: 4,
      title: "WoW Addons",
      description:
        "Built two addons using Lua one for mass player messaging and one for a gameplay enhancement. Combined, these have over a thousand downloads.",
      tags: ["Lua"],
      image: "/Project-Images/whispermacros.png",
      isPrivate: false,
      githubUrl: "https://github.com/EthanRule/WhisperMacros",
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-16 pb-20 bg-gradient-to-b from-slate-200 to-slate-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-2"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
            <div className="w-18 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-1"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-3"></div>
            <div className="w-3 h-3 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.8)]"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1"></div>
            <div className="w-14 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-1"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
          </div>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-center">
              <div className="w-full max-w-lg">
                <Project
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  websiteUrl={project.websiteUrl}
                  isPrivate={project.isPrivate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
