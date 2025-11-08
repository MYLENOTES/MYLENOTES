import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  {
    src: "/heroImages/hero5.jpg",
    alt: "hero image 1",
  },
  {
    src: "/heroImages/hero2.jpg",
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

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000); // Change image every x seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center items-center relative h-screen w-full ">
      <div className="relative w-full h-full overflow-hidden carousel">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-40" : "opacity-0"
            } carousel-item`}
          >
            <Image src={src.src} alt="" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div className="absolute flex flex-col items-center justify-center w-full h-full text-text">
        <div className="bg-gray-500 bg-opacity-60 text-center p-2 md:p-3 lg:p-3 rounded-md w-3/4 md:w-9/12 lg:w-7/12">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold mb-1">
            Transform the way you learn
          </h2>
          <h4 className="text-text lg:text-lg md:text-lg text-sm font-normal">
            Connect with students, share knowledge, and succeed together
          </h4>
        </div>
        <button className="bg-primary bg-opacity-80 hover:bg-opacity-90 text-background font-semibold p-2 px-11 mt-3 rounded-md transition-all shadow-lg">
          Join the Community
        </button>
      </div>
    </div>
  );
}
