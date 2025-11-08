import Image from "next/image";

const images = [
  {
    src: "/features/noteBuddy.webp",
    alt: "feature1",
  },
  {
    src: "/features/noteshare.jpg",
    alt: "feature2",
  },
  {
    src: "/features/examSaver.png",
    alt: "feature3",
  },
];

const features = [
  {
    title: "Note Buddy",
    description: "Find and share notes instantly, and get the most out of your study sessions, with ease and efficiency!",
  },
  {
    title: "Share Your Notes",
    description: "Upload your notes and help fellow students, while gaining access to a vast library of notes!",
  },
  {
    title: "Exam Saver",
    description: "Get instant access to all the notes you need, and ace your exams with confidence and ease!",
  },
];

export default function Features() {
  return (
    <div className="w-full max-w-6xl h-auto p-6 mt-12 flex flex-col justify-center items-center">
      <h3 className="text-text font-medium text-xl md:text-2xl mb-8 opacity-80">Key Features</h3>
      <div className="flex flex-wrap gap-6 justify-center items-stretch">
        {features.map((feature, index) => (
          <div key={index} className="border border-gray-800 bg-gray-900 bg-opacity-30 rounded-lg p-5 w-full sm:w-2/5 md:w-1/4 min-h-[240px] flex flex-col items-center justify-center text-center hover:border-gray-700 transition-all">
            <Image src={images[index].src} alt={images[index].alt} width={60} height={60} className="rounded-full opacity-80" />
            <h5 className="text-text text-base font-medium mt-3 mb-2">{feature.title}</h5>
            <p className="text-text opacity-70 text-xs leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}