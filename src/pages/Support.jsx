import React from "react";
import { Link } from "react-router-dom";

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Support Center</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          We're here to help you with any issues or questions you may have.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition-colors duration-300">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Browse our comprehensive guides and tutorials.</p>
            <Link to="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">View FAQs →</Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition-colors duration-300">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Chat with our support team in real-time.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Start Chat
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center transition-colors duration-300">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Send us an email and we'll get back to you.</p>
            <a href="mailto:support@campuscare.edu" className="text-blue-600 dark:text-blue-400 hover:underline">
              support@campuscare.edu
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Support Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">User Guide</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Learn how to use all features of CampusCare effectively.</p>
              <a href="#guide" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Read Guide →</a>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">System Status</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Check the current status of our services.</p>
              <a href="#status" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View Status →</a>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Report a Bug</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Found a technical issue? Let us know.</p>
              <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Report Bug →</a>
            </div>

            <div className="border-l-4 border-yellow-600 pl-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Feature Request</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Suggest new features or improvements.</p>
              <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Make Request →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
