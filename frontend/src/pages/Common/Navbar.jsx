import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-background flex justify-between items-center px-4 sm:px-18 py-3">
      <div className="font-bold text-2xl text-primary tracking-wide">
        RentEasy
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
