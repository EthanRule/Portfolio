"use client";
import { ToolImage } from "./ToolImage";

export default function Toolkit() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-zinc-300 mb-4">Toolkit 🛠️</h2>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-700">
          <p className="text-zinc-300 text-xl text-center mb-12">
            What I use on a{" "}
            <span className="italic font-semibold text-zinc-200">daily</span>{" "}
            basis.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-6 justify-items-center">
            <ToolImage
              src="/Project-Images/tools/ubuntu.png"
              alt="Ubuntu"
              shadowColor="amber-400"
            />
            <ToolImage
              src="/Project-Images/tools/git.png"
              alt="Git"
              shadowColor="amber-400"
            />
            <ToolImage
              src="/Project-Images/tools/github.png"
              alt="GitHub"
              shadowColor="purple-800"
            />
            <ToolImage
              src="/Project-Images/tools/cursor.png"
              alt="Cursor"
              shadowColor="white"
            />
            <ToolImage
              src="/Project-Images/tools/neovim.png"
              alt="Neovim"
              shadowColor="green-500"
            />
            <ToolImage
              src="/Project-Images/tools/ts.png"
              alt="Typescript"
              shadowColor="blue-400"
            />
            <ToolImage
              src="/Project-Images/tools/react.png"
              alt="React"
              shadowColor="cyan-400"
            />
            <ToolImage
              src="/Project-Images/tools/tailwind.png"
              alt="Tailwind"
              shadowColor="cyan-700"
            />
            <ToolImage
              src="/Project-Images/tools/nextjs.png"
              alt="Nextjs"
              shadowColor="white"
            />
            <ToolImage
              src="/Project-Images/tools/postgresql.png"
              alt="Postgresql"
              shadowColor="blue-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
