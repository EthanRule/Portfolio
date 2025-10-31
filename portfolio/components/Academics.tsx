export default function Academics() {
  const courseCategories = [
    {
      category: "Core Computer Science",
      courses: [
        "CPT_S 121 - Program Design & Development C/C++",
        "CPT_S 223 - Advanced Data Structures C/C++",
        "CPT_S 260 - Intro to Computer Architecture",
        "CPT_S 350 - Design & Analysis of Algorithms",
        "CPT_S 360 - Systems Programming C/C++",
        "CPT_S 411 - Intro to Parallel Computing",
      ],
    },
    {
      category: "AI & Data Science",
      courses: [
        "CPT_S 315 - Introduction to Data Mining",
        "CPT_S 415 - Big Data",
        "CPT_S 437 - Intro to Machine Learning",
        "CPT_S 440 - Artificial Intelligence",
      ],
    },
    {
      category: "Software Engineering",
      courses: [
        "CPT_S 321 - Object-Oriented Software Principles",
        "CPT_S 355 - Programming Language Design",
        "CPT_S 421 - Software Design Project I",
        "CPT_S 423 - Software Design Project II",
      ],
    },
    {
      category: "Mathematics & Statistics",
      courses: [
        "MATH 171/172/273 - Calculus I, II, III",
        "MATH 216 - Discrete Structures",
        "MATH 220 - Introductory Linear Algebra",
        "MATH 315 - Differential Equations",
        "STAT 360 - Probability and Statistics",
      ],
    },
  ];

  return (
    <section id="academics" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">
            Academic Background
          </h2>
          <div className="flex items-center justify-center relative">
            <div className="w-1 h-1 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.4)] relative top-0.5"></div>
            <div className="w-6 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-4"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.7)] relative top-1"></div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)]"></div>
            <div className="w-28 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1.5"></div>
            <div className="w-14 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-3"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-1"></div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
            <div className="w-6 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1 h-1 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.4)] relative -top-0.5"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {courseCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-xl border border-green-950 p-6 hover:shadow-lg transition-all duration-300 bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage: "url('/Project-Images/chalkboard.jpeg')",
              }}
            >
              <div className="absolute inset-0 bg-zinc-900/70 "></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-zinc-300 mb-4 border-b border-slate-200 pb-2">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.courses.map((course, courseIndex) => (
                    <li
                      key={courseIndex}
                      className="text-zinc-300 text-sm flex items-start"
                    >
                      <span className="w-2 h-2 rounded-full bg-zinc-400 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="font-mono">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Degree Information
            </h3>
            <div className="text-slate-700">
              <p className="mb-2">
                <strong>Degree:</strong> Bachelor of Science in Computer Science
              </p>
              <p className="mb-2">
                <strong>University:</strong> Washington State University
              </p>
              <p className="mb-2">
                <strong>Graduation:</strong> 2024
              </p>
              <p className="text-sm text-slate-600 mt-4">
                Specialized in AI/ML, Software Engineering, and Low Level
                Programming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
