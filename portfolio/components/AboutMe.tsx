import Link from "next/link";

export default function AboutMe() {
  return (
    <section id="about" className="pt-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
            <div className="bg-zinc-950 p-6 rounded-tr-xl rounded-bl-xl border border-zinc-700">
              <p className="text-zinc-300 leading-relaxed">
                Hey there 👋, I'm Ethan. I write full-stack applications with
                Next.js, Typescript, React, Tailwind, and host on services like
                AWS and Vercel. Academically, I've written C/C++, C#, and Python
                covering various domains.
              </p>
            </div>
            <div className="bg-zinc-950 p-6 rounded-tr-xl rounded-bl-xl border border-zinc-700">
              <p className="text-zinc-300 leading-relaxed">
                In my spare time I have a passion hobby playing World of
                Warcraft (Balance Druid{" "}
                <span className="text-blue-400 font-bold">
                  <Link href="https://check-pvp.fr/us/Sargeras/Rudar">
                    main
                  </Link>
                </span>
                ), which lead me to build{" "}
                <span className="text-blue-400 font-bold">
                  <Link href="https://rudarz.com">rudarz.com</Link>
                </span>
                . I also enjoy exercising and project based learning through{" "}
                <span className="font-bold text-purple-400">
                  <Link href="https://roadmap.sh/u/ethanrule">roadmap.sh</Link>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
    </section>
  );
}
