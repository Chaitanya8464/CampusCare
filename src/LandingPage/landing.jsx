import React from "react";
import { Link } from "react-router-dom";
import unic from "../assets/unicae3.jpg";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-10 py-36 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-lg">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Welcome to CampusCare
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            A smart platform for students and faculty to submit and track
            complaints, ensuring a better and smoother campus experience.
          </p>
          <Link
            to="/submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition inline-block"
          >
            Submit Complaint
          </Link>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src={unic}
            alt="Campus illustration"
            className="w-80 h-80 object-cover rounded-full shadow-lg"
          />
        </div>
      </header>

      {/* How It Works */}
      <section className="py-12 px-10 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h3 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">1. Submit</h4>
            <p className="text-gray-600 dark:text-gray-300">
              File a complaint online in just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">2. Track</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor the progress of your complaint in real-time.
            </p>
          </div>
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">3. Resolve</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get timely updates and resolution from authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h3 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">
          What Students Say
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "CampusCare made it so easy for me to raise issues in my hostel
              and track them. Super helpful!"
            </p>
            <h5 className="mt-4 font-bold text-blue-700 dark:text-blue-400">- Aditi, 3rd Year</h5>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Finally, a transparent system where complaints actually get
              resolved. CampusCare is amazing!"
            </p>
            <h5 className="mt-4 font-bold text-blue-700 dark:text-blue-400">- Rohan, 2nd Year</h5>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-10 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h3 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-10">
          Why Choose CampusCare?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Easy Complaint Submission</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Students can submit complaints in just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Real-time Tracking</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Track the status of your complaint anytime, anywhere.
            </p>
          </div>
          <div className="p-6 bg-blue-100 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Transparent Process</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Ensure accountability and timely resolution of issues.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-10 text-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">Need Help?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have questions or facing issues? Reach out to us anytime.
        </p>
        <Link
          to="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition inline-block"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
