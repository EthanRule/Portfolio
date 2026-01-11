interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  websiteUrl?: string;
  isPrivate?: boolean;
}

export default function Project({
  title,
  description,
  tags,
  image,
  githubUrl,
  websiteUrl,
  isPrivate = false,
}: ProjectProps) {
  const url = websiteUrl || githubUrl;
  
  const content = (
    <div className="bg-zinc-900/50 overflow-hidden transition-all duration-200 border border-zinc-700 flex flex-col cursor-pointer hover:outline hover:outline-1 hover:outline-white/40">
      <div className="h-64 bg-zinc-300 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 bg-zinc-800/50">
        <h3 className="text-lg font-mono font-semibold text-zinc-300 tracking-wide">{title}</h3>
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
