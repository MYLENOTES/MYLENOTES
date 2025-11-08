import Image from "next/image";
import { MdPhoneEnabled } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { SiFacebook } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


export default function Footer() {
    const contactInfo = [
        { icon: <MdPhoneEnabled  size={13}/>, text: "+91 7859645126" },
        { icon: <FiMail size={13}/>, text: "info@gmail.com" }
    ];

    const quickLinks = [
        { text: "Home", href: "/" },
        { text: "Notes", href: "/notes" },
        { text: "Features", href: "/features" },
        { text: "About us", href: "/about" },
        { text: "Upload Notes", href: "/uploadNotes" }
    ];

    const socialMedia = [
        { icon: <FaLinkedin size={15}/>, text: "Linkedin", href: "#" },
        { icon: <FaSquareXTwitter size={15}/>, text: "Twitter", href: "#" },
        { icon: <SiFacebook size={15}/>, text: "Facebook", href: "#" }
    ];

    return (
        <footer className="flex flex-col w-full h-auto px-6 py-6 bg-background border-t border-gray-800">
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start w-full max-w-7xl mx-auto mb-4">
                <div className="w-full md:w-5/12">
                    <Image
                        src={"/logo.png"}
                        alt="logo"
                        height={50}
                        width={120}
                        className="mb-3"
                    />
                    <p className="text-text text-xs opacity-70 leading-relaxed mb-3">
                        MyleNotes is your go-to platform for sharing and accessing lecture notes from various colleges and universities.
                    </p>
                    <p className="text-text text-xs opacity-50">
                        &copy; 2024 MyleNotes. All Rights Reserved
                    </p>
                </div>
                <div className="w-full md:w-2/12">
                    <h4 className="font-medium text-sm text-primary mb-3">Quick Links</h4>
                    <ul className="text-text text-xs space-y-2">
                        {quickLinks.map((link, index) => (
                            <li key={index} className="hover:text-primary opacity-70 hover:opacity-100 transition-all">
                                <a href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-2/12">
                    <h4 className="font-medium text-sm text-primary mb-3">Contact</h4>
                    <ul className="text-text text-xs space-y-2">
                        {contactInfo.map((item, index) => (
                            <li key={index} className="hover:text-primary opacity-70 hover:opacity-100 flex gap-1.5 items-center transition-all">
                                {item.icon}
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-2/12">
                    <h4 className="font-medium text-sm text-primary mb-3">Follow Us</h4>
                    <ul className="text-text text-xs space-y-2">
                        {socialMedia.map((link, index) => (
                            <li key={index} className="hover:text-primary opacity-70 hover:opacity-100 flex gap-1.5 items-center transition-all">
                                {link.icon}
                                <a href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
