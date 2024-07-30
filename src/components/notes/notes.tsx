import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import UploadNotes from "./uploadNotes";

const popularNotes = [
  {
    imageSrc: "/notespageImages/nootes.jpeg",
    title: "Introduction to Algorithms",
    author: "Lecture Notes of CITK",
    profilePic: "/dp.jpg",
    authorName: "Monalisha Roy",
    date: "22 July 2024",
  },
  {
    imageSrc: "/notespageImages/hero.jpg",
    title: "Operating Systems",
    author: "Lecture Notes of CITK",
    profilePic: "/dp.jpg",
    authorName: "Monalisha Roy",
    date: "22 July 2024",
  },
  {
    imageSrc: "/heroImages/hero5.jpg",
    title: "Data Structures and Algorithms",
    author: "Lecture Notes of NIT",
    profilePic: "/dp.jpg",
    authorName: "Monalisha Roy",
    date: "22 July 2024",
  },
  {
    imageSrc: "/notespageImages/nootes.jpeg",
    title: "Introduction to Algorithms",
    author:
      "Lecture Notes of CITK pfaoreitg  faoie  faoe aose  eriotwe  asoidfa f od fa odfi ",
    profilePic: "/dp.jpg",
    authorName: "Monalisha Roy",
    date: "22 July 2024",
  },
  {
    imageSrc: "/notespageImages/hero.jpg",
    title: "Operating Systems",
    author: "Lecture Notes of CITK",
    profilePic: "/dp.jpg",
    authorName: "Monalisha Roy",
    date: "22 July 2024",
  },
];

export default function Notes() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-4">
      {popularNotes.map((note, index) => (
        <div
          key={index}
          className="w-full h-auto rounded-lg hover:bg-primary hover:bg-opacity-20 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="h-full">
            <div className="w-full h-64 rounded-lg bg-primary bg-opacity-60 relative overflow-hidden">
              <Image
                src={note.imageSrc}
                alt="notes image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <p className="mt-2 px-3 text-text text-xl font-semibold">
              {note.title}
            </p>
            <p className="px-3 mt-1 mb-1 text-text text-xs font-normal">
              {note.author.length > 40
                ? `${note.author.slice(0, 40)}...`
                : note.author}
            </p>
          </div>
          <div className="flex gap-1 mt-1 px-3 mb-3 items-center">
            <Image
              src={note.profilePic}
              alt="profile pic"
              width={38}
              height={38}
              className="rounded-full hover:cursor-pointer"
            />
            <p className="px-3 text-text text-sm font-medium">
              {note.authorName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
