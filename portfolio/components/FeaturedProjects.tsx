import { useState } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";
import Toolkit from "@/components/Toolkit/TechnicalSkills";
import Tetris from "./Tetris";

export default function FeaturedProjects() {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "BoxSurvivor (Currently Working On)",
      description: "Top Down Bullet Hell Game.",
      tags: ["C++", "Unreal Engine"],
      image: "/Project-Images/BoxSurvivor2.png",
      images: [
        "/Project-Images/BoxSurvivor2.png",
        "/Project-Images/BoxSurvivor1.png",
      ],
    },
    {
      id: 2,
      title: "Rudarz.com",
      description: "World of Warcraft Balance Druid PvP course.",
      tags: ["Next.js", "Stripe", "Vercel"],
      image: "/Project-Images/Rudarz.com.png",
      websiteUrl: "https://rudarz.com",
    },

    {
      id: 3,
      title: "RefineGen",
      description: "Context assisted AI image generator.",
      tags: ["Next.js", "Stripe", "AWS"],
      image: "/Project-Images/refinegen.png",
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
      image: "/Project-Images/precog.png",
      githubUrl:
        "https://github.com/EthanRule/lockout",
    },
    {
      id: 7,
      title: "AI ShotTracker",
      description: "Basketball Shot Tracker",
      tags: ["Kotlin"],
      isPrivate: false,
      image: "/Project-Images/ai-shot-tracker.png",
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
      image: "/Project-Images/whispermacros.png",
      githubUrl:
        "https://github.com/EthanRule/WhisperMacros",
    },
    {
      id: 10,
      title: "wow-stats",
      description: "World of Warcraft Statistics website",
      tags: ["Typescript"],
      isPrivate: false,
      image: "/Project-Images/wow-stats.png",
      websiteUrl: "https://wow-stats.vercel.app/",
    },
  ];

  return (
    <section id="projects" className="relative py-16 pb-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-center">
              <div className="w-full max-w-lg">
                <Project
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  images={project.images}
                  githubUrl={project.githubUrl}
                  websiteUrl={project.websiteUrl}
                  isPrivate={project.isPrivate}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 hidden" style={{ transform: 'translateY(-50%) translateX(calc(28rem + 4rem))' }}>
          <Tetris />
        </div>
      </div>
    </section>
  );
}
