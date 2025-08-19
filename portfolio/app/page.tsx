"use client";
import Header from "@/components/Header";
import AboutMe from "@/components/AboutMe";
import TechnicalSkills from "@/components/TechnicalSkills";
import Academics from "@/components/Academics";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <AboutMe />
      <TechnicalSkills />
      <Academics />
      <FeaturedProjects />
      <Footer />
    </div>
  );
}
