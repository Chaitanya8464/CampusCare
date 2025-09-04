import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintForm from "./components/ComplaintForm";
import TrackComplaints from "./components/TrackComplaints";
import login from "./pages/SignInForm";
import signup from "./pages/SignUpForm";
import LandingPage from "./LandingPage/landing";
import { Link } from "react-router-dom";
import profileLogo from './assets/profileLogo.jpg';
  import logo from './assets/CampusCare.jpg';
import SignInForm from "./pages/SignInForm";

export default function App() {
  return (
    <Router>
     <div className="flex flex-col  ">
      {/* Navbar */}
      <nav className="flex justify-between rounded-lg shadow-gray-200 items-center bg-gray-800 text-white px-6 py-4 shadow-sm fixed top-0  left-0 w-full z-50">
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
          
        </div>
        
      </nav>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submit" element={<ComplaintForm />} />
        <Route path="/track" element={<TrackComplaints />} />
        <Route path="/login" element={<SignInForm />} />
      {/*}  <Route path="/signup" element={<SignUpForm />} /> */}
      </Routes>
    </Router>
  );
}
