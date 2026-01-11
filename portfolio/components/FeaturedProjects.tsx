import { useState } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";
import Toolkit from "@/components/Toolkit/TechnicalSkills";
import Tetris from "./Tetris";

export default function FeaturedProjects() {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Rudarz.com",
      description: "World of Warcraft Balance Druid PvP course.",
      tags: ["Next.js", "Stripe", "Vercel"],
      image: "/Project-Images/Rudarz.com.png",
      websiteUrl: "https://rudarz.com",
    },

    {
      id: 2,
      title: "RefineGen",
      description: "Context assisted AI image generator.",
      tags: ["Next.js", "Stripe", "AWS"],
      image: "/Project-Images/refinegen.png",
      isPrivate: false,
      githubUrl: "https://github.com/EthanRule/RefineGen",
    },
    {
      id: 3,
      title: "Spreadsheet Engine",
      description: "Excel like spreadsheet engine",
      tags: [".NET"],
      isPrivate: false,
      image: "/Project-Images/spreadsheetEngine.jpg",
      githubUrl:
        "https://github.com/EthanRule/spreadsheet_application/tree/main",
    },
    {
      id: 4,
      title: "Rust Database Engine",
      description: "Document oriented database engine",
      tags: ["Rust"],
      isPrivate: false,
      image: "/Project-Images/rust.png",
      githubUrl:
        "https://github.com/EthanRule/rustdb",
    },
  ];

  return (
    <section id="projects" className="relative py-16 pb-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
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
        <div className="absolute top-1/2 left-1/2 hidden lg:block" style={{ transform: 'translateY(-50%) translateX(calc(28rem + 4rem))' }}>
          <Tetris />
        </div>
      </div>
    </section>
  );
}
