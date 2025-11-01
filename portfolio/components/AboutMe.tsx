import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/Me/pfp.jpg"
              alt="Ethan Rule - Software Engineer"
              width={280}
              height={280}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>

          {/* About Text */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-700">
              <p className="text-zinc-300 leading-relaxed">
                Hey there 👋, I'm Ethan. I write full-stack applications with
                Next.js (Typescript/Tailwind/React/PostgreSQL) and for fun I
                like to mess around with low level Rust programming.
                Academically, I've written C/C++, C#, and Python covering
                various domains.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-700">
              <p className="text-zinc-300 leading-relaxed">
                In my spare time I like to play World of Warcraft (Balance Druid{" "}
                <span className="text-blue-400 font-bold">
                  <Link href="https://check-pvp.fr/us/Sargeras/Rudar">
                    main
                  </Link>
                </span>
                ), League of Legends (support{" "}
                <span className="text-blue-400 font-bold">
                  <Link href="https://op.gg/lol/summoners/na/Rudar12-NA1">
                    main
                  </Link>
                </span>
                ), exercise, and learn on{" "}
                <span className="font-bold text-purple-400">
                  <Link href="https://roadmap.sh/u/ethanrule">roadmap.sh</Link>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
