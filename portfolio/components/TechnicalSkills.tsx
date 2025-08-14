export default function TechnicalSkills() {
  return (
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
              <div className="text-orange-600 text-2xl mb-3">🛠️</div>
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
  );
}
