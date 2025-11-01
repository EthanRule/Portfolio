"use client";
import { useState, useEffect } from "react";
import ParticleConstellation from "./ParticleConstellationGraph";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      {/* Sticky Navigation Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50`}
      >
        <div className="px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name - Aligned to left with margin */}
            <div className="text-xl font-bold text-white ml-4">Ethan Rule</div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6 mr-20">
              <button
                onClick={() => scrollToSection("projects")}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Projects
              </button>
              i
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-slate-300 hover:text-white transition-colors duration-200"
                onClick={() => scrollToSection("about")}
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
        {/* Mathematical Animation Canvas */}
        <ParticleConstellation />

        {/* Download Resume Button - Fixed Top Right */}
        <div className="fixed top-2.5 right-2.5 z-50">
          <a
            href="/resume/ethan_rule_resume.pdf"
            download="ethan_rule_resume.pdf"
            className="bg-slate-900 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center group shadow-lg"
            title="Download Resume"
          >
            <svg
              className="w-6 h-6"
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
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            Ethan Rule
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-mono">
            CS Graduate • Software Engineer
          </p>
        </div>
      </header>
    </>
  );
}
