"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Login from "@/components/auth/login";
import { auth } from "../../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Signup from "@/components/auth/singup";
import ForgotPassword from "@/components/auth/forgotPassword";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscThreeBars } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

const links = [
  { name: "home", path: "/" },
  { name: "notes", path: "/notes" },
  { name: "about", path: "/about" },
];

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSigUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const openSignup = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const openForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
  };

  const closeMenu = () => setIsOpen(false);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <nav
        className={`hidden md:flex h-16 w-full items-center justify-between fixed top-0 z-30 px-6 sm:px-2 transition-all duration-300 ease-in-out ${
          isTop ? "bg-transparent" : "bg-background shadow-lg"
        }`}
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            height={80}
            width={175}
            className="p-1 transition-transform duration-500 transform hover:scale-105"
          />
        </Link>
        <ul className="flex gap-6">
          {links.map((link, index) => (
            <li key={index} className="uppercase font-semibold">
              <Link
                href={link.path}
                className={`text-text hover:text-primary transition-colors duration-500 text-md sm:text-sm ${
                  pathname === link.path
                    ? "text-primary border-b-2 border-primary"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="relative"
            >
              <Image
                src="/dp.jpg"
                alt="profile pic"
                width={38}
                height={38}
                className="rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
              />

              {hover && (
                <div className="absolute right-0 top-10 w-40 bg-white shadow-md rounded-md py-2 text-xs text-gray-800">
                  <a className="block px-4 py-2 hover:bg-gray-100">Wishlist</a>
                  <a
                    onClick={logout}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={openLogin}
                className="px-4 py-2 border border-text text-text rounded-lg transition-all duration-300 hover:bg-text hover:text-background"
              >
                Login
              </button>
              <button
                onClick={openSignup}
                className="px-4 py-2 border border-text text-text rounded-lg transition-all duration-300 hover:bg-text hover:text-background"
              >
                Signup
              </button>
            </>
          )}
        </div>

        <Login
          show={showLogin}
          onClose={() => setShowLogin(false)}
          switchToSignUp={openSignup}
          switchToForgotPassword={openForgotPassword}
        />
        <Signup
          show={showSigUp}
          onClose={() => setShowSignUp(false)}
          switchToLogin={openLogin}
        />
        <ForgotPassword
          show={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </nav>

      {/* Mobile Navbar */}
      <div className="sm:hidden">
        <nav
          className={`h-16 w-full fixed top-0 z-30 px-4 flex items-center justify-between transition-all duration-300 ease-in-out ${
            isTop || isOpen ? "bg-transparent" : "bg-background shadow-lg"
          }`}
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              height={80}
              width={175}
              className="p-1 transition-transform duration-500 transform hover:scale-105"
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <AiOutlineClose size={30} className="text-text" />
            ) : (
              <VscThreeBars size={30} className="text-text" />
            )}
          </button>
          {isOpen && (
            <div className="flex flex-col gap-1 py-3 absolute top-16 left-0 w-full bg-background text-text text-center transition-all duration-500 ease-in-out">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  onClick={closeMenu}
                  className="block py-3 hover:text-primary hover:bg-gray-900 transition-colors duration-300"
                >
                  <p>{link.name}</p>
                </Link>
              ))}
              {!isLoggedIn && (
                <>
                  <p
                    onClick={() => {
                      setShowLogin(true);
                      closeMenu();
                    }}
                    className="block py-3 hover:text-primary hover:bg-gray-900 cursor-pointer"
                  >
                    Login
                  </p>
                  <p
                    onClick={() => {
                      setShowSignUp(true);
                      closeMenu();
                    }}
                    className="block py-3 hover:text-primary hover:bg-gray-900 cursor-pointer"
                  >
                    Signup
                  </p>
                </>
              )}
            </div>
          )}
        </nav>

        <Login
          show={showLogin}
          onClose={() => setShowLogin(false)}
          switchToSignUp={openSignup}
          switchToForgotPassword={openForgotPassword}
        />
        <Signup
          show={showSigUp}
          onClose={() => setShowSignUp(false)}
          switchToLogin={openLogin}
        />
        <ForgotPassword
          show={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </>
  );
}