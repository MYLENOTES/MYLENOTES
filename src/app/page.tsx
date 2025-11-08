"use client";
import HomeHero from "@/components/home/hero";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Features from "@/components/home/features";
import Notes from "@/components/notes/notes";
import HowItWorks from "@/components/home/howItWorks";

export default function HomePage() {
  return (
    <main className="bg-background flex  min-h-screen flex-col items-center justify-between">
      <HomeHero />

      <Features />
      <div className="p-2 md:p-4 lg:p-5 py-12 w-full flex flex-col items-center">
        <h3 className="font-bold text-xl text-text mb-4">Popular Notes</h3>
        <Notes />
      </div>
      <HowItWorks />
    </main>
  );
}
