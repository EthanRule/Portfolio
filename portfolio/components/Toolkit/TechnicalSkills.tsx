"use client";
import { ToolImage } from "./ToolImage";

export default function Toolkit() {
  return (
    <section id="skills" className="py-8 px-4 sm:px-6 lg:px-8 bg-zinc-950 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12"></div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-6">
            <ToolImage
              src="/Project-Images/tools/github.png"
              alt="GitHub"
              shadowColor="purple-800"
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
