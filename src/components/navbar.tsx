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
  {
    name: "home",
    path: "/",
  },
  {
    name: "notes",
    path: "/notes",
  },
  {
    name: "about",
    path: "/about",
  },
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <nav
        className={`hidden md:flex h-12 w-full items-center justify-between fixed top-0 z-30 px-6 sm:px-2
          ${isTop ? "bg-transparent" : "bg-background shadow-md"}
        `}
      >
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={80}
            width={175}
            className="p-1"
          />
        </Link>
        <ul className="flex gap-5">
          {links.map((link, index) => (
            <li key={index} className="inline-block uppercase font-semibold">
              <Link
                href={link.path}
                className={`text-text hover:text-primary duration-500 text-md sm:text-sm ${
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

        <div className="flex justify-end items-center gap-2">
          {isLoggedIn && (
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className=""
            >
              <Image
                src={"/dp.jpg"}
                alt="profile pic"
                width={38}
                height={38}
                className="rounded-full hover:cursor-pointer"
              />

              {hover && (
                <div className="flex flex-col text-xs text-gray-800 absolute top-12 right-2 rounded-md bg-white p-1 hover:cursor-pointer">
                  <a className="p-1 px-3 hover:bg-gray-300 rounded-sm ">
                    Wishlist
                  </a>
                  <a
                    onClick={logout}
                    className="p-1 px-3 hover:bg-gray-300 rounded-sm "
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && !showLogin && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent text-text px-4 py-1 border border-text rounded-md text-md hover:bg-text hover:text-background"
            >
              Login
            </button>
          )}
          {!isLoggedIn && !showSigUp && (
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-transparent text-text px-4 py-1 border border-text rounded-md text-md hover:bg-text hover:text-background"
            >
              Signup
            </button>
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
      <div className="sm:hidden">
        <nav
          className={`h-12 w-full fixed top-0 z-30 px-4 flex items-center justify-between
            ${!isTop || isOpen ? "bg-background" : "bg-transparent"}
          `}
        >
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              height={80}
              width={175}
              className="p-1"
            />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <AiOutlineClose size={30} className='text-text' /> : <VscThreeBars size={30} className='text-text' />}
          </button>
          {isOpen && (
            <div className="flex flex-col gap-1 py-3 absolute top-12 left-0 w-full bg-background text-text text-center">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  onClick={closeMenu}
                  className="block py-3 hover:text-primary hover:bg-gray-900"
                >
                  <p>{link.name}</p>
                </Link>
              ))}
              {!isLoggedIn && !showLogin && (
                <p
                  onClick={() => {
                    setShowLogin(true);
                    closeMenu();
                  }}
                  className="block py-3 hover:text-primary hover:bg-gray-900"
                >
                  Login
                </p>
              )}
              {!isLoggedIn && !showSigUp && (
                <p
                  onClick={() => {
                    setShowSignUp(true);
                    closeMenu();
                  }}
                  className="block py-3 hover:text-primary hover:bg-gray-900"
                >
                  Signup
                </p>
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