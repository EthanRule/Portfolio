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
          <h2 className="text-4xl font-bold text-zinc-300 mb-4">
            Academic Background ✏️
          </h2>
        </div>

        <div className="bg-zinc-900/50 px-6 py-6 rounded-t-xl border-t border-zinc-700">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 ">
            {courseCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="rounded-xl border border-zinc-700 p-6 hover:shadow-lg transition-all duration-300 bg-cover bg-center relative overflow-hidden"
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
        </div>
        <DegreeInformation />
      </div>
    </section>
  );
}

function DegreeInformation() {
  return (
    <div className="text-left bg-zinc-900/50">
      <div className="text-zinc-300 rounded-b-xl border-b border-zinc-700 pl-8 pr-8 pb-8 flex items-center justify-between">
        <div>
          <p className="mb-2">
            <strong>University:</strong> Washington State University
          </p>
          <p className="mb-2">
            <strong>Degree:</strong> Bachelor of Science in Computer Science
          </p>
          <p>
            <strong>Graduation:</strong> 2024
          </p>
        </div>
        <div className="flex justify-end">
          <img
            src="/Project-Images/wsu.png"
            alt="Washington State University"
            className="h-12 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
