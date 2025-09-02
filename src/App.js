import React from "react";
import logo from './assets/CampusCare.jpg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComplaintForm from "./components/ComplaintForm";
import TrackComplaints from "./components/TrackComplaints";

export default function App() {
  return (
    <Router>
      <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold flex item-center gap-2">
                   <img src={logo} alt="CampusCare" className="w-8 h-8" /> <span>CampusCare</span>
                </h1>
                <div className="flex gap-3">
                <button className="px-4 py-1 bg-black text-white rounded-lg">Student View</button>
                <button className="px-4 py-1 border rounded-lg">Admin View</button>
            </div>
        </div>
      <Routes>
        <Route path="/" element={<ComplaintForm />} />
        <Route path="/track" element={<TrackComplaints />} />
      </Routes>
    </Router>
  );
}
