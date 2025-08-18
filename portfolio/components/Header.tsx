import ParticleConstellation from "./ParticleConstellationGraph";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Mathematical Animation Canvas */}
      <ParticleConstellation />

      {/* Download Resume Button - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/resume/Ethan Rule Resume (4).pdf"
          download="Ethan_Rule_Resume.pdf"
          className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400/50 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center group"
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

      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
          Ethan Rule
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-32 font-light">
          Software Engineer
        </p>
      </div>
    </header>
  );
}
