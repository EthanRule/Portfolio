"use client";
import ParticleConstellation from "./ParticleConstellationGraph";

export default function Header() {
  return (
    <>
      {/* Main Header */}
      <header className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
        {/* Mathematical Animation Canvas */}
        <ParticleConstellation />

        {/* Download Resume Button - Fixed Top Right */}
        <div className="fixed top-2.5 right-2.5 z-50">
          <a
            href="/resume/ethan_rule_resume.pdf"
            download="ethan_rule_resume.pdf"
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-300 p-2 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center group shadow-lg"
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
