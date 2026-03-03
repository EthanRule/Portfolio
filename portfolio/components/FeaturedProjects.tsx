"use client";
import { useState } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";
import Toolkit from "@/components/Toolkit/TechnicalSkills";
import Tetris from "./Tetris";

export default function FeaturedProjects() {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Karternia (Currently Working On)",
      description: "Top Down Bullet Hell Game.",
      tags: ["C++", "Unreal Engine"],
      image: "/Project-Images/BoxSurvivor2.png",
      video: "/Videos/BoxSurvivorGameplay.mp4",
    },
    {
      id: 2,
      title: "Rudarz.com",
      description: "World of Warcraft Balance Druid PvP course.",
      tags: ["Next.js", "Stripe", "Vercel"],
      image: "/Project-Images/typescript.png",
      websiteUrl: "https://rudarz.com",
    },

    {
      id: 3,
      title: "RefineGen",
      description: "Context assisted AI image generator.",
      tags: ["Next.js", "Stripe", "AWS"],
      image: "/Project-Images/typescript.png",
      isPrivate: false,
      githubUrl: "https://github.com/EthanRule/RefineGen",
    },
    {
      id: 4,
      title: "Spreadsheet Engine",
      description: "Excel like spreadsheet engine",
      tags: [".NET"],
      isPrivate: false,
      image: "/Project-Images/spreadsheetEngine.jpg",
      githubUrl:
        "https://github.com/EthanRule/spreadsheet_application/tree/main",
    },
    {
      id: 5,
      title: "Rust Database Engine",
      description: "Document oriented database engine",
      tags: ["Rust"],
      isPrivate: false,
      image: "/Project-Images/rust.png",
      githubUrl:
        "https://github.com/EthanRule/rustdb",
    },
    {
      id: 6,
      title: "Lockout",
      description: "Kick Predictor",
      tags: ["Lua"],
      isPrivate: false,
      image: "/Project-Images/lua.png",
      githubUrl:
        "https://github.com/EthanRule/lockout",
    },
    {
      id: 7,
      title: "AI ShotTracker",
      description: "Basketball Shot Tracker",
      tags: ["Kotlin"],
      isPrivate: false,
      image: "/Project-Images/python.png",
    },
    {
      id: 8,
      title: "AutoVideos",
      description: "Automated Video Editor",
      tags: ["Python"],
      isPrivate: false,
      image: "/Project-Images/python.png",
      githubUrl:
        "https://github.com/EthanRule/AutoVideos",
    },
    {
      id: 9,
      title: "WhisperMacros",
      description: "Automated Networking System",
      tags: ["Lua"],
      isPrivate: false,
      image: "/Project-Images/lua.png",
      githubUrl:
        "https://github.com/EthanRule/WhisperMacros",
    },
    {
      id: 10,
      title: "wow-stats",
      description: "World of Warcraft Statistics website",
      tags: ["Typescript"],
      isPrivate: false,
      image: "/Project-Images/typescript.png",
      websiteUrl: "https://wow-stats.vercel.app/",
    },
  ];

  const boxSurvivor = projects.find(p => p.title.includes("Karternia"));
  const previousProjects = projects.filter(p => !p.title.includes("Karternia"));

  return (
    <section id="projects" className="relative py-16 pb-32 bg-zinc-950 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(173, 216, 230, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(173, 216, 230, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Karternia */}
        {boxSurvivor && (
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-lg">
              <Project
                id={boxSurvivor.id}
                title={boxSurvivor.title}
                description={boxSurvivor.description}
                tags={boxSurvivor.tags}
                image={boxSurvivor.image}
                images={boxSurvivor.images}
                video={boxSurvivor.video}
                githubUrl={boxSurvivor.githubUrl}
                websiteUrl={boxSurvivor.websiteUrl}
                isPrivate={boxSurvivor.isPrivate}
                disableHover={true}
              />
            </div>
          </div>
        )}

        {/* Previous Software Engineering Projects */}
        <div className="mt-12">
          <h2 className="text-sm md:text-base text-slate-400 font-sans antialiased mb-4 text-center tracking-wide">
            Previous Software Engineering Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
            {previousProjects.map((project) => {
              const url = project.websiteUrl || project.githubUrl;
              const content = (
                <div className="relative group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border border-zinc-700 transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-zinc-900/50">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    <div className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-slate-300">
                      {project.title}
                    </div>
                  </div>
                </div>
              );
              
              if (url) {
                return (
                  <a
                    key={project.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                );
              }
              
              return <div key={project.id}>{content}</div>;
            })}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 hidden" style={{ transform: 'translateY(-50%) translateX(calc(28rem + 4rem))' }}>
          <Tetris />
        </div>
      </div>
    </section>
  );
}
