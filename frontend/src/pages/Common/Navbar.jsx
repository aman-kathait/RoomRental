import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`
    fixed top-0 left-0 w-full z-50
    flex justify-between items-center
    px-4 sm:px-8 lg:px-20 py-3
    transition-all duration-300 shadow-md
    ${
      scrolled ? "bg-background/70 backdrop-blur-md shadow-lg" : "bg-background"
    }
  `}
    >
      <div className="font-bold text-2xl text-primary tracking-wide">
        <span className="text-black">Rent</span>Easy
      </div>

      <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
        <li className="hover:text-primary transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-primary transition">
          <Link to="/room">Room</Link>
        </li>
        <li className="hover:text-primary transition">
          <Link to="/find-room">Find Room</Link>
        </li>
        <li className="hover:text-primary transition">
          <Link to="/contact-us">Contact Us</Link>
        </li>
      </ul>

      <div className="hidden md:block">
        <div className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition cursor-pointer">
          My Profile
        </div>
      </div>

      <div
        className="md:hidden"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <X /> : <Menu />}
        {isMenuOpen && (
          <div className="absolute top-12 left-0 w-full bg-purple-50 shadow-md p-4 z-10">
            <div className="md:hidden mt-4 space-y-3 text-gray-700 justify-center items-center flex flex-col">
              <Link to="/" className="block">
                Home
              </Link>
              <Link to="/room" className="block">
                Room
              </Link>
              <Link to="/find-room" className="block">
                Find Room
              </Link>
              <Link to="/contact-us" className="block">
                Contact Us
              </Link>

              <div className=" bg-primary text-white px-4 py-2 rounded-md text-center cursor-pointer">
                My Profile
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
