"use client";
import { useState, useEffect } from "react";
import ParticleConstellation from "./ParticleConstellationGraph";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [monthsExperience, setMonthsExperience] = useState(0);
  const [selectedId, setSelectedId] = useState(1);
  const [displayedId, setDisplayedId] = useState(1);
  const [fading, setFading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Karternia",
      image: "/Project-Images/KarterniaGameplay.jpg",
      description:
        "3D roguelike video game built in Unreal Engine 5 with 95% C++. Features UE Mass + spatial hash raytrace caching system for enemy movement, spatial hash smart aim system, and ability system that heavily uses the strategy design pattern."
    },
    {
      id: 5,
      title: "Rust Database Engine",
      image: "/Project-Images/rust.png",
      url: "https://github.com/EthanRule/rustdb",
      description:
        "Document-oriented database engine written in Rust. Implements B-tree indexing, persistent storage with json to bson compression, and LRU cache.",
    },
    {
      id: 2,
      title: "Rudarz.com",
      image: "/Project-Images/Rudarz.com.png",
      url: "https://rudarz.com",
      description:
        "World of Warcraft Balance Druid PvP course platform. Billing via Stripe, and deployed on Vercel. Compresses 30 thousands hours of expertise into a 10 hour deep dive filled with challenges. Used by over 10k players, and 300+ paying customers.",
    },
    {
      id: 9,
      title: "Whisper Macros",
      image: "/Project-Images/whispermacros.png",
      url: "https://github.com/EthanRule/WhisperMacros",
      description:
        "In-game social automation system scripted in Lua for World of Warcraft. Connects players together to form real teams and real connections faster than any other method. Enabling players to climb rating faster than ever before.",
    },
    {
      id: 7,
      title: "AI ShotTracker",
      image: "/Project-Images/ai-shot-tracker.png",
      description:
        "Computer vision basketball shot tracking app. Built with Google Mediapipe, Tensorflow, and a Pixel 3 Android phone. With over 10k images from roboflow, models were trained both on google colab and locally using a 2080 GPU. To not over or underfit, we found 25 epochs to work the best with this dataset size and our limited live testing basketball court. This was my teams capstone project.",
    },
    {
      id: 3,
      title: "RefineGen",
      image: "/Project-Images/refinegen.png",
      url: "https://github.com/EthanRule/RefineGen",
      description:
        "Context-assisted AI image generator with a prompt refinement pipeline, image-to-image generation, and style transfer workflows. Currently undeployed to prevent potential API abuse on a project that is no longer being continued.",
    },
    {
      id: 4,
      title: "Spreadsheet Engine",
      image: "/Project-Images/spreadsheetEngine.jpg",
      url: "https://github.com/EthanRule/spreadsheet_application/tree/main",
      description:
        "Excel-like spreadsheet engine built in .NET. Supports formula parsing, cell dependency graphs, and live recalculation across sheets. Heavily utilizes observer, command, factory, singleton, and layered deisgn patterns.",
    },
    {
      id: 6,
      title: "Lockout",
      image: "/Project-Images/lockout.png",
      url: "https://github.com/EthanRule/lockout",
      description:
        "WoW PvP interrupt timing Lua addon. Analyzes enemy cast patterns to predict optimal kick windows and maximize spell lockout uptime.",
    },
    {
      id: 8,
      title: "AutoVideos",
      image: "/Project-Images/AutoVideos.png",
      url: "https://github.com/EthanRule/AutoVideos",
      description:
        "Automated CLI video editing pipeline in Python. Processes raw footage, applies effects, and renders final cuts without manual intervention.",
    },
    {
      id: 10,
      title: "WoW Stats",
      image: "/Project-Images/wow-stats.png",
      url: "https://wow-stats.vercel.app/",
      description:
        "World of Warcraft statistics website aggregating player performance to display unique data from the public Blizzard API with interactive charts and leaderboards.",
    },
  ];

  const selectedProject = projects.find((p) => p.id === selectedId)!;
  const displayedProject = projects.find((p) => p.id === displayedId)!;

  useEffect(() => {
    projects.forEach((p) => {
      if (p.image) {
        const img = new window.Image();
        img.src = p.image;
      }
    });
  }, []);

  useEffect(() => {
    if (selectedId === displayedId) return;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayedId(selectedId);
      setFading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [selectedId]);

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date(2026, 0, 1);
      const currentDate = new Date();
      const diffTime = currentDate.getTime() - startDate.getTime();
      const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
      setMonthsExperience(Math.max(0, diffMonths));
    };

    calculateExperience();
    const interval = setInterval(calculateExperience, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollPosition > viewportHeight * 0.8); // Show nav when 80% past the header
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Navigation Header - Disabled */}
      <nav className="hidden"></nav>

      {/* Main Header */}
      <header
        className="min-h-screen bg-black relative flex flex-col overflow-hidden"
        style={{
          backgroundImage: "url('/Project-Images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Mathematical Animation Canvas */}
        <ParticleConstellation />

        {/* Hamburger menu - Fixed Top Right */}
        <div className="fixed top-3 right-3 z-50 flex flex-col items-end gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/50 hover:text-white/90 transition-colors p-1"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://github.com/EthanRule"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                title="LinkedIn"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a
                href="https://x.com/Rudar__"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="/resume/ethan_rule_resume.pdf"
                download="ethan_rule_resume.pdf"
                title="Download Resume"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Name - pinned top left */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ethan Rule
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-sans antialiased tracking-wide mt-1">
            C++ Systems Engineer
          </p>
        </div>

        {/* Projects list - vertically centered left */}
        <div className="absolute left-20 top-1/2 -translate-y-1/2 z-10 pl-4">
          <p
            className="text-base text-slate-300 uppercase tracking-widest mb-3 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Projects
          </p>
          <ul className="space-y-2.5">
            {projects.map((p, i) => (
              <li
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className="flex items-center pl-2 border-l-2 border-transparent hover:border-white transition-all duration-200 hover:scale-105 origin-left cursor-pointer animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.06}s` }}
              >
                <span
                  className={`text-sm font-bold transition-colors ${selectedId === p.id ? "text-white/30" : "text-white/60 hover:text-white/90"}`}
                >
                  {p.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project preview - centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className={`w-[30rem] aspect-video pointer-events-auto transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
          >
            {displayedProject.video ? (
              <video
                key={displayedProject.id}
                src={displayedProject.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                key={displayedProject.id}
                src={displayedProject.image}
                alt={displayedProject.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Description - absolutely positioned to the right of the centered video */}
        <div
          key={displayedId}
          className={`absolute top-1/2 -translate-y-1/2 z-10 w-56 text-sm text-white/70 leading-relaxed transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
          style={{ left: "calc(50% + 17rem)" }}
        >
          {displayedProject.description.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.25em] animate-word"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Background credit */}
        <div className="absolute bottom-3 right-4 z-10 text-xs text-white/15 select-none">
          Background by BlackDevilx
        </div>
      </header>
    </>
  );
}
