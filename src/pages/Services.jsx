import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      title: "Academic Support",
      description: "Report issues related to assignments, exams, results, and syllabus.",
      icon: "📚"
    },
    {
      title: "Facility Management",
      description: "Complaints about hostel, classroom, library, and lab facilities.",
      icon: "🏢"
    },
    {
      title: "Transport Services",
      description: "Issues related to campus buses, parking, and transportation.",
      icon: "🚌"
    },
    {
      title: "Canteen & Food",
      description: "Feedback and complaints about campus food services.",
      icon: "🍽️"
    },
    {
      title: "IT Support",
      description: "Technical issues with campus WiFi, computers, and software.",
      icon: "💻"
    },
    {
      title: "Security Services",
      description: "Report security concerns, lost items, or safety issues.",
      icon: "🔒"
    },
    {
      title: "Medical Services",
      description: "Health-related concerns and medical facility issues.",
      icon: "🏥"
    },
    {
      title: "Finance & Fees",
      description: "Issues related to fees, scholarships, and financial matters.",
      icon: "💰"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Our Services</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          CampusCare provides comprehensive support across all aspects of campus life.
          Browse our services and submit complaints related to any area.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-colors duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/submit" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition inline-block">
            Submit a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
