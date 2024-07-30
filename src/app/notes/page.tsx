'use client';
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import UploadNotes from "@/components/notes/uploadNotes";
import Notes from "@/components/notes/notes";


const images = [
  {
    src: "/heroImages/hero5.jpg",
    alt: "hero image 1",
  },
  {
    src: "/heroImages/hero1.jpg",
    alt: "hero image 2",
  },
  {
    src: "/heroImages/hero3.jpg",
    alt: "hero image 3",
  },
  {
    src: "/heroImages/hero4.jpg",
    alt: "hero image 4",
  },
];

export default function Home() {
  const searchPlaceholder = "Search for a note...";

  return (
    <main className="bg-background flex min-h-screen w-full flex-col justify-between">
      <div className="flex justify-center items-center relative h-[80vh] w-full">
        <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full text-text">
          <div className="bg-gray-500 bg-opacity-60 text-center p-2 md:p-3 lg:p-3 rounded-md w-3/4 md:w-9/12 lg:w-7/12">
            <h2 className="text-4xl md:text-4xl lg:text-4xl font-semibold mb-1">Notes at your Fingertips</h2>
            <h4 className="text-text text-sm md:text-lg lg:text-lg font-normal"> Search, access, and learn from a vast library of notes at your fingertips </h4>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center w-96 gap-2 mt-3">
            <input type="search" className="p-2 px-4 rounded-lg text-gray-800" placeholder={searchPlaceholder} />
            <button className="bg-primary hover:bg-secondary text-text font-semibold p-2 px-11 rounded-md">
              Search
            </button>
          </div>
        </div>
        <div className="relative w-full h-full z-0">
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            className="w-full h-full overflow-hidden"
          >
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-[80vh]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  className="object-cover"
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent z-20"></div>
        </div>
      </div>
      <div className="h-auto p-2 md:p-4 lg:p-5 px-10 md:px-12 lg:px-14  ml-3 py-12 flex flex-col">
        <h3 className="font-bold text-xl text-text mb-3">Popular Notes</h3>
        <Notes/>
      </div>
      <div className="h-auto p-2 md:p-4 lg:p-5 px-10 md:px-12 lg:px-14 ml-3 py-12 flex flex-col">
        <h3 className="font-bold text-xl text-text mb-3">CITK Notes</h3>
        <Notes />
      </div>
      <div className="px-16">
          <UploadNotes />
      </div>
    </main>
  );
}
