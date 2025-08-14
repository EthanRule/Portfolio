import { Project as ProjectType } from "@/types/project";
import Project from "./Project";

interface FeaturedProjectsProps {
  projects: ProjectType[];
  currentSlide: number;
  isTransitioning: boolean;
  setCurrentSlide: (value: number | ((prev: number) => number)) => void;
  setIsTransitioning: (value: boolean) => void;
  handleUserInteraction: () => void;
}

export default function FeaturedProjects({
  projects,
  currentSlide,
  isTransitioning,
  setCurrentSlide,
  setIsTransitioning,
  handleUserInteraction,
}: FeaturedProjectsProps) {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-slate-900 mb-4">
            Featured Projects
          </h2>
          <div className="h-0.5 w-24 bg-slate-300 mx-auto"></div>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={handleUserInteraction}
        >
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-full px-4"
              >
                <div className="max-w-2xl mx-auto">
                  <Project
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.image}
                    githubUrl={project.githubUrl}
                    isPrivate={project.isPrivate}
                  />
                </div>
              </div>
            ))}
            <div
              key={`${projects[0].id}-duplicate`}
              className="flex-shrink-0 w-full px-4"
            >
              <div className="max-w-2xl mx-auto">
                <Project
                  id={projects[0].id}
                  title={projects[0].title}
                  description={projects[0].description}
                  tags={projects[0].tags}
                  image={projects[0].image}
                  githubUrl={projects[0].githubUrl}
                  isPrivate={projects[0].isPrivate}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  handleUserInteraction();
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide % projects.length
                    ? "bg-slate-600 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentSlide((prev) => {
                if (prev === 0) {
                  setIsTransitioning(false);
                  const newSlide = projects.length;
                  setTimeout(() => {
                    setIsTransitioning(true);
                    setCurrentSlide(projects.length - 1);
                  }, 50);
                  return newSlide;
                }
                return prev - 1;
              });
              handleUserInteraction();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => prev + 1);
              handleUserInteraction();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
