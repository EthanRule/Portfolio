import { useState } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";

export default function FeaturedProjects() {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Rudarz.com",
      description: "World of Warcraft Balance Druid PvP course.",
      tags: ["Next.js", "Tailwind", "Vercel"],
      image: "/Project-Images/Rudarz.com.png",
      isPrivate: false,
      githubUrl: "https://github.com/EthanRule/rudarz.com",
    },

    {
      id: 2,
      title: "RefineGen",
      description: "Context assisted AI image generator.",
      tags: ["Next.js", "Tailwind", "AWS"],
      image: "/Project-Images/refinegen.png",
      isPrivate: false,
      githubUrl: "https://github.com/EthanRule/RefineGen",
    },
  ];

  return (
    <section id="projects" className="relative py-16 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-zinc-300 mb-4">
            Featured Projects
          </h2>
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
