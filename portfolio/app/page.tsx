"use client";
import { useState, useEffect } from "react";
import Project from "@/components/Project";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  const [currentYear, setCurrentYear] = useState("2023");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const projects = [
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
      title: "AI Basketball Shot Tracker 📋",
      description:
        "Computer vision application that tracks basketball shots using machine learning algorithms. Analyzes shooting form, accuracy, and provides performance insights for player improvement.",
      tags: ["Python", "OpenCV", "Machine Learning", "Computer Vision"],
      image: "/Project-Images/ai-shot-tracker.png",
      isPrivate: true,
    },
  ];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Auto-scroll carousel every 10 seconds, with 15-second pause on interaction
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 10000); // 10 seconds

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
      }, 700); // Wait for transition to complete
    }
  }, [currentSlide, projects.length]);

  // Function to handle user interaction (pauses carousel for 15 seconds)
  const handleUserInteraction = () => {
    setIsCarouselPaused(true);
    setTimeout(() => {
      setIsCarouselPaused(false);
    }, 15000); // 15 seconds
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Animated accent elements */}
        <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
            Ethan Rule
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
            Software Engineer
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="/resume/Ethan Rule Resume (4).pdf"
              download="Ethan_Rule_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              About Me
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Hey I&apos;m Ethan! I'm a software engineer with a passion for
                building innovative applications with the latest technologies. I
                have experience using the latest languages such as Typescript
                and Rust. I also have college experience with languages like
                C/C++ and Python.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                My expertise spans full-stack development, from frontend user
                interfaces to backend systems and machine learning pipelines. I
                enjoy learning new technologies any applying them to create
                maintainable evergreen software solutions.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">10+</div>
                  <div className="text-sm text-slate-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">4+</div>
                  <div className="text-sm text-slate-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-600">Technologies</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-lg font-medium text-slate-900 mb-6">
                Core Expertise
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">Full-Stack Development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">Web Applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">Low Level Programming</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-6">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300">
                <div className="text-blue-600 text-2xl mb-3">⚛️</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  Frontend
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  React • Typescript
                  <br />
                  HTML • Tailwindcss
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-green-400 transition-all duration-300">
                <div className="text-green-600 text-2xl mb-3">🖥️</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  Backend
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  Typescript • C# • Python • Rust
                  <br />
                  MongoDB • PostgreSQL
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-purple-400 transition-all duration-300">
                <div className="text-purple-600 text-2xl mb-3">📱</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  Mobile
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  Kotlin • Android Studio
                  <br />
                  Android • Mobile First CSS
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-orange-400 transition-all duration-300">
                <div className="text-orange-600 text-2xl mb-3">�️</div>
                <h3 className="text-sm font-mono text-slate-700 mb-3 font-semibold">
                  Tools
                </h3>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  Git • Copilot
                  <br />
                  VS Code • Neovim Basics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 bg-white">
        {/* Projects Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Featured Projects
            </h2>
            <div className="h-0.5 w-24 bg-slate-300 mx-auto"></div>
          </div>

          {/* Horizontal Scrolling Carousel */}
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
              {/* Duplicate first project for seamless loop */}
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

            {/* Carousel Indicators */}
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

            {/* Navigation Arrows */}
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Bottom Section */}
          <div className=" border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2025 Ethan Rule Portfolio
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/EthanRule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a
                  href="https://leetcode.com/u/Rudar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <span className="sr-only">LeetCode</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
