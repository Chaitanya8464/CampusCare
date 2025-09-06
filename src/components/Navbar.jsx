import react, { useState } from "react";
import { Link } from "react-router-dom";
import profileLogo from '../assets/profileLogo.jpg';
import logo from '../assets/CampusCare.jpg';
import { div, svg } from "framer-motion/client";

export default function Navbar() {
    const[isOpen, setIsOpen] =useState(false);
return (
     <div className="flex flex-col  ">
      {/* Navbar */}
      <nav className="flex justify-between  shadow-gray-200 items-center bg-gray-800 text-white px-6 py-4 shadow-sm fixed top-0  left-0 w-full z-50">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="CampusCare" className="w-10 h-10 rounded-full" />
          CampusCare
        </h1>

        <div className="hidden md:flex gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-600  rounded-full hover:bg-gray-100 transition"
          >
            <img src={profileLogo} alt="Profile" className="w-10 h-10 rounded-full" />
          </Link>
          
          <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
           >
            {isOpen ? (
                <svg
                className="w-6 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            )}
          </button>
        </div>
        {/*Mobile View*/}
        {isOpen && (
            <div className="md:hidden mt-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4 shadow-md z-40">
                <Link
                 to="/"
                 className="hover:underline"
                 onClick={() => setIsOpen(false)}>Home</Link>
                <Link
                 to="/about"
                 className="hover:underline"
                 onClick={() => setIsOpen(false)}>About</Link>
                <Link
                 to="/services"
                 className="hover:underline"
                 onClick={() => setIsOpen(false)}>Services</Link>
                <Link
                 to="/contact"
                 className="hover:underline"
                 onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
        )}
      </nav>
        
       
      </div>
);
}
