export default function TechnicalSkills() {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Rust", level: "expert" },
        { name: "Python", level: "expert" },
        { name: "C#", level: "expert" },
        { name: "Lua", level: "expert" },
        { name: "SQL", level: "proficient" },
        { name: "C/C++", level: "proficient" },
        { name: "TypeScript/JavaScript", level: "proficient" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "Tailwind CSS", level: "expert" },
        { name: "Next.js", level: "proficient" },
        { name: "NumPy/OpenCV", level: "proficient" },
        { name: "React/React Native", level: "intermediate" },
        { name: "Node.js", level: "intermediate" },
      ],
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "VS Code", level: "expert" },
        { name: "Git", level: "expert" },
        { name: "Cargo", level: "expert" },
        { name: "PostgreSQL", level: "proficient" },
        { name: "Vercel", level: "proficient" },
        { name: "FFmpeg", level: "intermediate" },
      ],
    },
  ];

  // Function to get styling based on proficiency level
  const getSkillStyling = (level: string) => {
    switch (level) {
      case "expert":
        return {
          bullet:
            "bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg shadow-blue-700/50",
          text: "text-slate-900 font-semibold",
          glow: "drop-shadow-sm",
        };
      case "proficient":
        return {
          bullet:
            "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-500/40",
          text: "text-slate-800 font-medium",
          glow: "",
        };
      case "intermediate":
        return {
          bullet:
            "bg-gradient-to-r from-blue-300 to-blue-400 shadow-sm shadow-blue-300/30",
          text: "text-slate-700",
          glow: "",
        };
      default:
        return {
          bullet: "bg-blue-400",
          text: "text-slate-700",
          glow: "",
        };
    }
  };

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-slate-200"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Technical Skills
          </h2>
          <div className="flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-6 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-3"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-3"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-1"></div>
            <div className="w-3 h-3 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.8)]"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1.5"></div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-4"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-1"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
          </div>
          <p className="text-slate-700 mt-4 text-lg">
            Languages, Frameworks & Tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => {
                  const styling = getSkillStyling(skill.level);
                  return (
                    <li
                      key={skillIndex}
                      className="text-slate-700 text-sm flex items-start"
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 ${styling.bullet}`}
                      ></span>
                      <span
                        className={`font-mono transition-colors duration-300 ${styling.text} ${styling.glow}`}
                      >
                        {skill.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
