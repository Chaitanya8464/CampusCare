import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-8">About CampusCare</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            CampusCare is dedicated to improving the campus experience for students, faculty, and staff by providing 
            a transparent and efficient platform for reporting and tracking complaints. We believe that every concern 
            matters and deserves timely attention.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What We Do</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Our platform enables users to submit complaints anonymously or with their identity, track the status of 
            their submissions in real-time, and receive updates when actions are taken. We cover various categories 
            including academics, facilities, services, finance, security, and more.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Clear tracking and updates for every complaint submitted.</p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Accountability</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Ensuring responsible authorities address each issue promptly.</p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Privacy</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Option to submit complaints anonymously for sensitive matters.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/submit" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition inline-block">
            Submit a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
