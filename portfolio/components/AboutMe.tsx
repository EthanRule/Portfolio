import Image from "next/image";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <div className="flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)]"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-2"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-3"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-1"></div>
            <div className="w-14 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <Image
                src="/Me/pfp.jpg"
                alt="Ethan Rule - Software Engineer"
                width={280}
                height={280}
                className="rounded-2xl shadow-lg object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10"></div>
            </div>
          </div>

          {/* About Text */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="text-slate-600 leading-relaxed mb-4">
                Hey, I&apos;m Ethan! I&apos;m a software engineer passionate
                about building innovative applications with modern technologies.
                I work with languages like TypeScript and Rust, and also have
                experience in C, C++, and Python.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                My expertise spans full-stack development—from frontend
                interfaces to backend systems and machine learning pipelines. I
                enjoy exploring new tools and applying them to create
                maintainable, long-lasting software solutions.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="md:bg-transparent bg-slate-200 md:p-0 p-6 rounded-xl">
              <h3 className="text-lg md:font-medium font-bold text-slate-900 mb-4">
                Technical Focus
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm">
                    Full-Stack Development
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm">
                    Machine Learning
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm">
                    Web Applications
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm">
                    Systems Programming
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
