import { useState, useEffect } from "react";
import { Project as ProjectType } from "@/types/project";
import Project from "./Project";

export default function FeaturedProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

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

  // Auto-scroll carousel every 10 seconds, with 15-second pause on interaction
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Handle infinite loop transition
  useEffect(() => {
    if (currentSlide === projects.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 700);
    }
  }, [currentSlide, projects.length]);

  // Function to handle user interaction (pauses carousel for 15 seconds)
  const handleUserInteraction = () => {
    setIsCarouselPaused(true);
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 15000);
  };
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="h-0.5 w-24 bg-slate-300 mx-auto"></div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={handleUserInteraction}
        >
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-full px-4"
              >
                <div className="max-w-2xl mx-auto">
                  <Project
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    githubUrl={project.githubUrl}
                    isPrivate={project.isPrivate}
                  />
                </div>
              </div>
            ))}
            <div
              key={`${projects[0].id}-duplicate`}
              className="flex-shrink-0 w-full px-4"
            >
              <div className="max-w-2xl mx-auto">
                <Project
                  id={projects[0].id}
                  title={projects[0].title}
                  description={projects[0].description}
                  tags={projects[0].tags}
                  image={projects[0].image}
                  githubUrl={projects[0].githubUrl}
                  isPrivate={projects[0].isPrivate}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  handleUserInteraction();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide % projects.length
                    ? "bg-slate-600 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentSlide((prev) => {
                if (prev === 0) {
                  setIsTransitioning(false);
                  const newSlide = projects.length;
                  setTimeout(() => {
                    setIsTransitioning(true);
                    setCurrentSlide(projects.length - 1);
                  }, 50);
                  return newSlide;
                }
                return prev - 1;
              });
              handleUserInteraction();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => prev + 1);
              handleUserInteraction();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
