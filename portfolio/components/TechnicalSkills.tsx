import Image from "next/image";

export default function TechnicalSkills() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">Toolkit</h2>
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
          <p className="text-blue-400 mt-4 text-lg font-bold">
            What I use on a daily basis.
          </p>

          <div className="flex flex-row gap-4">
            <Image
              src="/Project-Images/tools/ts.png"
              alt="Typescript"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-blue-400"
            />
            <Image
              src="/Project-Images/tools/git.png"
              alt="Git"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-amber-400"
            />
            <Image
              src="/Project-Images/tools/github.png"
              alt="GitHub"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-purple-800"
            />
            <Image
              src="/Project-Images/tools/nextjs.png"
              alt="Nextjs"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-white"
            />
            <Image
              src="/Project-Images/tools/react.png"
              alt="React"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-cyan-400"
            />
            <Image
              src="/Project-Images/tools/tailwind.png"
              alt="Tailwind"
              width={64}
              height={64}
              className="rounded-lg shadow-md shadow-cyan-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
