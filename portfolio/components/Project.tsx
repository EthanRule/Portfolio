interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

export default function Project({
  title,
  description,
  tags,
  image,
  githubUrl,
  isPrivate = false,
}: ProjectProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200 h-[420px] flex flex-col">
      <div className="h-32 bg-slate-100 relative flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
        />

        {isPrivate && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>PRIVATE</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-medium text-slate-900 mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full border border-slate-200 font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full border border-slate-200">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm overflow-hidden">
          <div className="line-clamp-3 text-slate-600 whitespace-pre-line leading-relaxed">
            {description}
          </div>
        </div>

        {githubUrl && (
          <div className="mt-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-sm w-full font-medium ${
                isPrivate
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="h-4 w-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {isPrivate && (
                <svg
                  className="h-3 w-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="flex-1 text-center">
                {isPrivate ? "Private Repository" : "View Repository"}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
