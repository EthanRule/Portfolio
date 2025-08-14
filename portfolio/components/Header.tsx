export default function Header() {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl font-light text-white mb-4 tracking-wide">
          Ethan Rule
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
          Software Engineer
        </p>

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
  );
}
