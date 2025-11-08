const points = [
  {
    title: "Upload and Share Notes",
    description1: "Share your notes with the community",
    description2: "Help others and get help in return",
  },
  {
    title: "Search and Discover",
    description1: "Get instant access to the notes you need",
    description2: "Use our search bar to find specific notes",
  },
  {
    title: "Access and Learn",
    description1: "Find notes from various subjects and topics",
    description2: "Learn from a vast library of user-uploaded content",
  },
  {
    title: "Connect with Others",
    description1: "Join a community of students and learners",
    description2: "Collaborate and discuss topics with others",
  },
];

export default function HowItWorks() {
  return (
    <div className="w-full max-w-6xl p-6 mt-12 flex flex-col items-center">
      <h2 className="w-full text-center text-xl md:text-2xl text-text font-medium mb-8 opacity-80">
        How It Works
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((point, index) => (
          <div key={index} className="flex flex-col items-start bg-gray-900 bg-opacity-30 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
            <div className="flex gap-3 items-center mb-3">
              <div className="bg-primary bg-opacity-20 rounded-md text-primary w-8 h-8 flex items-center justify-center font-medium text-sm flex-shrink-0">
                {index + 1}
              </div>
              <h3 className="text-text font-medium text-base">
                {point.title}
              </h3>
            </div>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-text text-sm opacity-70">
                {point.description1}
              </li>
              <li className="text-text text-sm opacity-70">
                {point.description2}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
