import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 to-zinc-950"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-400 mb-4">About Me</h2>
          <div className="flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)]"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-2"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-0.5"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-1"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-1"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform rotate-3"></div>
            <div className="w-2 h-2 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative -top-1"></div>
            <div className="w-14 h-0.5 bg-gradient-to-r from-[rgb(100,149,237)] to-[rgb(100,149,237)] mx-1 shadow-sm shadow-[rgba(100,149,237,0.3)] transform -rotate-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(100,149,237)] shadow-lg shadow-[rgba(100,149,237,0.5)] relative top-0.5"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <Image
                src="/Me/pfp.jpg"
                alt="Ethan Rule - Software Engineer"
                width={280}
                height={280}
                className="rounded-2xl shadow-lg object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10"></div>
            </div>
          </div>

          {/* About Text */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="text-white leading-relaxed mb-4">
                I primarily focus on writing full-stack applications with
                Next.js (Typescript/Tailwind/React/PostgreSQL) and for fun I
                like to mess around with low level Rust programming.
                Academically, I've writtin C/C++, C#, and Python covering
                various domains.
              </p>
            </div>
            <div>
              <p className="text-white leading-relaxed mb-4">
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
