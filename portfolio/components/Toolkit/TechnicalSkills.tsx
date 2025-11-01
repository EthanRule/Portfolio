"use client";
import { ToolImage } from "./ToolImage";

export default function Toolkit() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-zinc-300 mt-4 text-lg font-bold">
            What I use on a <span className="italic">daily</span> basis.
          </p>
          <div></div>
          <div className="flex justify-center flex-row gap-4 mt-20">
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
              alt="Postgresql"
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
