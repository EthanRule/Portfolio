export default function AboutMe() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-900 mb-6">About Me</h2>
          <div className="h-0.5 w-24 bg-slate-300 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Hey I&apos;m Ethan! I'm a software engineer with a passion for
              building innovative applications with the latest technologies. I
              have experience using the latest languages such as Typescript and
              Rust. I also have college experience with languages like C/C++ and
              Python.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              My expertise spans full-stack development, from frontend user
              interfaces to backend systems and machine learning pipelines. I
              enjoy learning new technologies any applying them to create
              maintainable evergreen software solutions.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">10+</div>
                <div className="text-sm text-slate-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">4+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">15+</div>
                <div className="text-sm text-slate-600">Technologies</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl">
            <h3 className="text-lg font-medium text-slate-900 mb-6">
              Core Expertise
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-slate-700">Full-Stack Development</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-slate-700">Web Applications</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-slate-700">Low Level Programming</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-slate-700">Machine Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
