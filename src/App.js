import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintForm from "./components/ComplaintForm";
import TrackComplaints from "./components/TrackComplaints";
import login from "./pages/SignInForm";
import signup from "./pages/SignUpForm";
import LandingPage from "./LandingPage/landing"
import About from "./pages/About"


  
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/submit" element={<ComplaintForm />} />
        <Route path="/track" element={<TrackComplaints />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
      <div className="bottom-0">
              <footer className="bg-gray-800 text-white text-center border-t border-gray-700 py-4 mt-auto ">
                  <p>&copy; {new Date().getFullYear()} CampusCare. All rights reserved.</p>
              </footer>

        </div>
    </Router>
  );
}
