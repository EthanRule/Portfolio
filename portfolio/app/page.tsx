"use client";
import Header from "@/components/Header";
import Academics from "@/components/Academics";
import FeaturedProjects from "@/components/FeaturedProjects";
import BeamAnimation from "@/components/BeamAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <BeamAnimation />
      <FeaturedProjects />
      <Academics />
    </div>
  );
}
