"use client";
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-typescript"; // Credit: https://www.npmjs.com/package/prism-code-editor-lightweight
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

//TODO: continue hooking up tools to display on this.

export function CodeSnippit() {
  const [code, setCode] = useState(`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border-b border-zinc-700">
            <span className="text-zinc-400 text-sm font-bold">file.ts</span>
          </div>
          <div className="p-4 bg-zinc-950 min-h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border-b border-zinc-700">
          <span className="text-zinc-400 text-sm font-bold">file.ts</span>
        </div>

        {/* Editor */}
        <div className="relative">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              highlight(code, languages.typescript, "typescript")
            }
            padding={16}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#18181b",
              minHeight: "200px",
              color: "#e4e4e7",
            }}
            className="code-editor"
          />
        </div>
      </div>
    </div>
  );
}
