"use client";
import Header from "@/components/Header";
import Academics from "@/components/Academics";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />{" "}
      {/** maybe make this point to cool projects instead of garbage seeking links*/}
      <FeaturedProjects />
      <Academics />
      <Footer />
    </div>
  );
}
