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
        role: "Backend Developer",
        github: "https://github.com/debanandsingha",
        linkedin: "https://www.linkedin.com/in/debanand"
    },
    {
        image: "/team/mona.jpeg",
        name: "Monalisha Roy",
        role: "Frontend Developer, UI/UX Designer",
        github: "https://github.com/Monalisha-Roy",
        linkedin: "https://www.linkedin.com/in/monalisha-roy-995978252"
    },
    {
        image: "/team/nabadeep.jpg",
        name: "Nabadeep Kr.  Das",
        role: "Backend Developer",
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
        <div className="flex flex-col items-start min-h-screen bg-background px-7 md:px-10 lg:px-20">
            <div className="flex flex-col md:flex-row justify-evenly w-full h-auto items-center mt-12 md:px-5">
                <div className="flex flex-col gap-4 md:gap-2 w-full md:w-1/2 mt-6 text-center md:text-left">
                    <h1 className="text-text text-3xl md:text-5xl lg:text-8xl font-bold">About Us</h1>
                    <p className="text-text text-base md:text-md lg:text-lg">
                        Welcome to MYLENOTES, your go-to platform for sharing and discovering notes.
                        Our mission is to empower learning and collaboration by providing a seamless note-sharing experience.
                    </p>
                </div>
                <Image src="/about.jpg" alt="about image" width={300} height={300} className="rounded-full mt-8 md:mt-0" />
            </div>

            <div className="flex flex-col gap-4 items-start px-4 mt-7 w-full md:w-4/5 lg:w-3/5">
                <h3 className="text-accent text-2xl md:text-3xl font-bold">The Power of Sharing</h3>
                <p className="text-text text-sm md:text-md">
                    We believe that knowledge sharing is key to unlocking individual and collective potential.
                    Our platform is designed to facilitate the exchange of ideas, insights, and expertise.
                    By providing a space for users to share and access notes, we aim to foster a community of learners and contributors.
                </p>
            </div>

            <div className="flex flex-col gap-4 items-start px-4 mt-10 w-full md:w-4/5 lg:w-3/5 text-left">
                <h3 className="text-accent text-2xl md:text-3xl font-bold">Our Values</h3>
                <ul className="text-text text-sm md:text-md">
                    {values.map((value, index) => (
                        <li key={index} className="flex items-center gap-1">{value.title}: {value.description}</li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center md:px-4 lg:px-8 py-10 w-full">
                <h3 className="text-accent text-2xl md:text-3xl font-bold">Our Team</h3>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {team.map((member, index) => (
                        <div key={index} className="text-text flex flex-col items-center justify-center gap-2 text-center border border-text p-4 rounded-lg w-80 md:w-96">
                            <Image src={member.image} alt={member.name} width={100} height={100} className="rounded-full object-cover" quality={100} />
                            <p className="text-lg font-semibold">{member.name}</p>
                            <p className="text-sm text-gray-300">{member.role}</p>
                            <div className="flex gap-2">
                                <a href={member.github} className="text-sm flex gap-1 text-gray-300 hover:text-primary"><FaGithub size={20}/> Github</a>
                                <a href={member.linkedin} className="text-sm flex gap-1 text-gray-300 hover:text-primary"><FaLinkedin size={20} /> Linkedin</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           

            <div className="flex flex-col gap-4 items-start px-4 mt-10 w-full md:w-3/5 text-left">
                <h3 className="text-accent text-2xl md:text-3xl font-bold">Social Media</h3>
                <ul className="text-text text-sm md:text-md">
                    {socialMedia.map((link, index) => (
                        <li key={index} className="hover:text-primary flex gap-2 items-center">
                            {link.icon}
                            <a href={link.href}>{link.text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
