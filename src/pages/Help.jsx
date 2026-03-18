import React from "react";
import { Link } from "react-router-dom";

export default function Help() {
  const guides = [
    {
      title: "Getting Started",
      icon: "🚀",
      items: [
        "Creating your account",
        "Navigating the dashboard",
        "Understanding complaint categories"
      ]
    },
    {
      title: "Submitting Complaints",
      icon: "📝",
      items: [
        "How to file a new complaint",
        "Uploading supporting documents",
        "Anonymous submission options",
        "Setting priority levels"
      ]
    },
    {
      title: "Tracking & Management",
      icon: "📊",
      items: [
        "Using ticket IDs to track status",
        "Understanding status updates",
        "Viewing complaint history"
      ]
    },
    {
      title: "Account Settings",
      icon: "⚙️",
      items: [
        "Updating profile information",
        "Changing password",
        "Notification preferences"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Help Center</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Find guides and resources to help you use CampusCare effectively.
        </p>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{guide.icon}</span>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{guide.title}</h2>
              </div>
              <ul className="space-y-2">
                {guide.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">Need More Help?</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/faq" className="text-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
              <span className="text-3xl block mb-2">❓</span>
              <h3 className="font-semibold text-gray-800 dark:text-white">FAQs</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Common questions answered</p>
            </Link>

            <Link to="/support" className="text-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
              <span className="text-3xl block mb-2">💬</span>
              <h3 className="font-semibold text-gray-800 dark:text-white">Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact our team</p>
            </Link>

            <Link to="/contact" className="text-center p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
              <span className="text-3xl block mb-2">📧</span>
              <h3 className="font-semibold text-gray-800 dark:text-white">Contact</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Send us a message</p>
            </Link>
          </div>
        </div>

        {/* Tutorial Video Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">Video Tutorials</h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-12 text-center transition-colors duration-300">
            <span className="text-6xl mb-4 block">🎬</span>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Video tutorials coming soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Learn how to use CampusCare with step-by-step video guides</p>
          </div>
        </div>
      </div>
    </div>
  );
}
