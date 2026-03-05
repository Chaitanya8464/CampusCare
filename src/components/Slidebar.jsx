import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Slidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-900 dark:bg-gray-950 text-white fixed top-16 left-0 shadow-lg transition-all duration-300 z-40`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-6 bg-blue-600 text-white p-2 rounded-full shadow-lg z-50"
        >
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
        
        <div className="p-4 pt-12">
          {isOpen && <h2 className="text-xl font-bold mb-6">Menu</h2>}
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/profile" className="hover:text-blue-400 flex items-center gap-2">
                <span>👤</span> {isOpen && <span className="text-gray-200">Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-400 flex items-center gap-2">
                <span>📊</span> {isOpen && <span className="text-gray-200">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-blue-400 flex items-center gap-2">
                <span>⚙️</span> {isOpen && <span className="text-gray-200">Settings</span>}
              </Link>
            </li>
            <li>
              <Link to="/submit" className="hover:text-blue-400 flex items-center gap-2">
                <span>📄</span> {isOpen && <span className="text-gray-200">Submit</span>}
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-blue-400 flex items-center gap-2">
                <span>🔍</span> {isOpen && <span className="text-gray-200">Track Complaint</span>}
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-blue-400 flex items-center gap-2">
                <span>❓</span> {isOpen && <span className="text-gray-200">Help</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
