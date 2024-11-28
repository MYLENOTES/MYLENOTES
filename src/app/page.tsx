"use client";
import HomeHero from "@/components/home/hero";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Features from "@/components/home/features";
import Notes from "@/components/notes/notes";
import HowItWorks from "@/components/home/howItWorks";

export default function HomePage() {
  return (
    <main className="bg-background flex  min-h-screen flex-col items-center justify-center">
      <HomeHero />

      <Features />
      <div className="h-auto p-2 md:p-4 lg:p-5 px-10 md:px-12 lg:px-14 ml-3 py-12 flex flex-col">
        <h3 className="font-bold text-xl text-text">Popular Notes</h3>
        <Notes />
      </div>
      <HowItWorks />
    </main>
  );
}
