import Image from "next/image";
import { FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";

const values = [
    {
        title: "Collaboration",
        description: "We believe that together, we can achieve more.",
    },
    {
        title: "Knowledge is sharing",
        description: "We're passionate about making knowledge accessible.",
    },
    {
        title: "Community",
        description: "We're committed to building a supportive and inclusive community.",
    },
];

const team = [
    {
        image: "/team/deba.jpg",
        name: "Debanand Singha",
        github: "https://github.com/debanandsingha",
        linkedin: "https://www.linkedin.com/in/debanand"
    },
    {
        image: "/team/mona.jpeg",
        name: "Monalisha Roy",
        github: "https://github.com/Monalisha-Roy",
        linkedin: "https://www.linkedin.com/in/monalisha-roy-995978252"
    },
    {
        image: "/team/nabadeep.jpg",
        name: "Nabadeep Kr.  Das",
        github: "https://github.com/NABADEEP069",
        linkedin: "https://www.linkedin.com/in/nabadeep-kr-das"
    },
];

const Contact = [
    {
        title: "Email",
        description: "@mylenotes.com",
    },
    {
        title: "Phone",
        description: "+91 1234567890",
    }
];

const socialMedia = [
    { icon: <FaLinkedin size={20} />, text: "Linkedin", href: "#" },
    { icon: <FaSquareXTwitter size={20} />, text: "Twitter", href: "#" },
    { icon: <SiFacebook size={20} />, text: "Facebook", href: "#" }
];

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-background px-6 md:px-10 lg:px-16 py-12">
            {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl gap-8 mb-16">
                <div className="flex flex-col gap-4 w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold">About Us</h1>
                    <p className="text-text text-base md:text-lg opacity-90 leading-relaxed">
                        Welcome to <span className="text-primary font-semibold">MYLENOTES</span>, your go-to platform for sharing and discovering notes.
                        Our mission is to empower learning and collaboration by providing a seamless note-sharing experience.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-primary opacity-20 rounded-full blur-3xl"></div>
                    <Image src="/about.jpg" alt="about image" width={280} height={280} className="rounded-full relative z-10 border-4 border-primary shadow-xl" />
                </div>
            </div>

            {/* Mission Section */}
            <div className="w-full max-w-6xl bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-xl p-8 mb-12">
                <h3 className="text-primary text-2xl md:text-3xl font-semibold mb-4">The Power of Sharing</h3>
                <p className="text-text text-base opacity-90 leading-relaxed">
                    We believe that knowledge sharing is key to unlocking individual and collective potential.
                    Our platform is designed to facilitate the exchange of ideas, insights, and expertise.
                    By providing a space for users to share and access notes, we aim to foster a community of learners and contributors.
                </p>
            </div>

            {/* Values Section */}
            <div className="w-full max-w-6xl mb-12">
                <h3 className="text-primary text-2xl md:text-3xl font-semibold mb-6 text-center">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <div key={index} className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-xl p-6 hover:border-opacity-40 transition-all">
                            <h4 className="text-primary text-lg font-semibold mb-2">{value.title}</h4>
                            <p className="text-text text-sm opacity-80">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section - Compact */}
            <div className="w-full max-w-6xl mb-10">
                <p className="text-text text-sm text-center opacity-60 mb-4">Developed by</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {team.map((member, index) => (
                        <div key={index} className="text-text flex flex-col items-center gap-1.5 text-center bg-gray-900 bg-opacity-30 border border-gray-800 p-3 rounded-lg w-36 hover:border-gray-700 transition-all">
                            <Image src={member.image} alt={member.name} width={50} height={50} className="rounded-full object-cover" quality={100} />
                            <p className="text-sm font-medium">{member.name}</p>
                            <div className="flex gap-2.5 mt-1">
                                <a href={member.github} className="text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={14}/>
                                </a>
                                <a href={member.linkedin} className="text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
