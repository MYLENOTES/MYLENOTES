"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Notes from "@/components/notes/notes";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Form from "./form";

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
  const [showPopup, setShowPopup] = useState(false);

  return (
    <main className="bg-gradient-to-b from-blue-200 to-blue-700 flex min-h-screen w-full flex-col justify-between">
      {/* Hero Section */}
      <div className="flex justify-center items-center relative h-[80vh] w-full">
        <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full text-text">
          <div className="bg-gray-700 bg-opacity-70 text-center p-4 md:p-5 lg:p-6 rounded-lg w-3/4 md:w-9/12 lg:w-7/12 shadow-lg">
            <h2 className="text-5xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 shadow-md">
              Notes at your Fingertips
            </h2>
            <h4 className="text-white text-base md:text-lg lg:text-xl font-light">
              Search, access, and learn from a vast library of notes at your fingertips
            </h4>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center w-96 gap-3 mt-4">
            <input
              type="search"
              className="p-3 px-5 rounded-lg text-gray-800 shadow-md w-full md:w-auto"
              placeholder={searchPlaceholder}
            />
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold p-3 px-12 rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105">
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
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </Carousel>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent z-20"></div>
        </div>
      </div>

      {/* Popular Notes Section */}
      <div className="h-auto p-4 md:p-6 lg:p-8 px-12 md:px-16 lg:px-24 py-12 flex flex-col justify-center items-center">
  <h3 className="font-bold text-2xl text-white mb-4 shadow-sm text-center">
   POPULAR NOTES
  </h3>
  <div className="w-full flex justify-center">
    <Notes />
  </div>
</div>


      {/* CITK Notes Section */}
      <div className="h-auto p-4 md:p-6 lg:p-8 px-12 md:px-16 lg:px-24 ml-3 py-12 flex flex-col">
        <h3 className="font-bold text-2xl text-white mb-4 shadow-sm text-center">CITK Notes
          
        </h3>
        <div className="w-full flex justify-center">

        <Notes />
      </div>
      </div>

      {/* Upload Notes Section */}
      <div className="flex justify-center items-center py-12">
        <div className="w-full md:w-64 lg:w-72 h-80 rounded-lg bg-gradient-to-b from-green-400 to-blue-400 shadow-lg flex flex-col gap-4 justify-center items-center text-white text-xl hover:bg-opacity-80 transition duration-300">
          {!showPopup ? (
            <>
              <div
                onClick={() => setShowPopup(true)}
                className="text-white bg-green-600 bg-opacity-60 rounded-full hover:scale-125 cursor-pointer transition duration-300 p-4 shadow-md"
              >
                <FiPlus size={60} />
              </div>
              <span>Upload your notes</span>
            </>
          ) : (
            <Form onClose={() => setShowPopup(false)} />
          )}
        </div>
      </div>
    </main>
  );
}
