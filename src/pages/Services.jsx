import React from "react";
import { Link } from "react-router-dom";

// Custom SVG Icons with gradient
const AcademicIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad1)" opacity="0.1"/>
    <path d="M32 12 L52 24 L32 36 L12 24 Z" fill="url(#grad1)"/>
    <path d="M32 36 L52 24 L52 36 L32 48 L12 36 L12 24 Z" fill="url(#grad1)" opacity="0.7"/>
    <rect x="30" y="48" width="4" height="8" fill="url(#grad1)"/>
    <circle cx="32" cy="56" r="3" fill="url(#grad1)"/>
  </svg>
);

const FacilityIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad2)" opacity="0.1"/>
    <rect x="16" y="20" width="32" height="32" rx="2" fill="url(#grad2)"/>
    <rect x="20" y="26" width="8" height="8" rx="1" fill="white" opacity="0.9"/>
    <rect x="32" y="26" width="8" height="8" rx="1" fill="white" opacity="0.9"/>
    <rect x="20" y="38" width="8" height="8" rx="1" fill="white" opacity="0.9"/>
    <rect x="32" y="38" width="8" height="8" rx="1" fill="white" opacity="0.9"/>
    <path d="M14 20 L32 12 L50 20" stroke="url(#grad2)" strokeWidth="3" fill="none"/>
  </svg>
);

const TransportIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad3)" opacity="0.1"/>
    <rect x="12" y="22" width="40" height="24" rx="4" fill="url(#grad3)"/>
    <rect x="16" y="26" width="12" height="10" rx="1" fill="white" opacity="0.9"/>
    <rect x="32" y="26" width="12" height="10" rx="1" fill="white" opacity="0.9"/>
    <circle cx="20" cy="50" r="4" fill="url(#grad3)"/>
    <circle cx="44" cy="50" r="4" fill="url(#grad3)"/>
    <path d="M12 38 L52 38" stroke="white" strokeWidth="2" opacity="0.5"/>
  </svg>
);

const CanteenIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad4)" opacity="0.1"/>
    <path d="M20 24 Q20 16 32 16 Q44 16 44 24 L44 44 Q44 52 32 52 Q20 52 20 44 Z" fill="url(#grad4)"/>
    <ellipse cx="32" cy="24" rx="12" ry="4" fill="white" opacity="0.3"/>
    <rect x="30" y="10" width="4" height="8" fill="url(#grad4)"/>
    <circle cx="32" cy="10" r="3" fill="url(#grad4)"/>
    <path d="M24 36 Q28 40 32 36 Q36 40 40 36" stroke="white" strokeWidth="2" fill="none"/>
  </svg>
);

const ITIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad5)" opacity="0.1"/>
    <rect x="14" y="18" width="36" height="26" rx="2" fill="url(#grad5)"/>
    <rect x="18" y="22" width="28" height="18" rx="1" fill="white" opacity="0.9"/>
    <rect x="26" y="44" width="12" height="4" fill="url(#grad5)"/>
    <rect x="22" y="48" width="20" height="3" rx="1" fill="url(#grad5)"/>
    <circle cx="32" cy="32" r="3" fill="url(#grad5)" opacity="0.5"/>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad6)" opacity="0.1"/>
    <path d="M32 12 L48 20 L48 36 Q48 48 32 54 Q16 48 16 36 L16 20 Z" fill="url(#grad6)"/>
    <path d="M32 22 L40 26 L40 36 Q40 44 32 48 Q24 44 24 36 L24 26 Z" fill="white" opacity="0.3"/>
    <circle cx="32" cy="35" r="5" fill="white" opacity="0.9"/>
    <path d="M32 30 L32 35 L36 38" stroke="url(#grad6)" strokeWidth="2" fill="none"/>
  </svg>
);

const MedicalIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad7)" opacity="0.1"/>
    <rect x="16" y="16" width="32" height="32" rx="4" fill="url(#grad7)"/>
    <rect x="28" y="20" width="8" height="24" rx="2" fill="white"/>
    <rect x="20" y="28" width="24" height="8" rx="2" fill="white"/>
    <circle cx="32" cy="32" r="6" fill="url(#grad7)"/>
  </svg>
);

const FinanceIcon = () => (
  <svg viewBox="0 0 64 64" className="w-16 h-16 mx-auto mb-4">
    <defs>
      <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#84CC16" />
        <stop offset="100%" stopColor="#65A30D" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#grad8)" opacity="0.1"/>
    <circle cx="32" cy="32" r="20" fill="url(#grad8)"/>
    <text x="32" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">$</text>
    <path d="M24 24 L28 28 M36 36 L40 40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M40 24 L36 28 M28 36 L24 40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export default function Services() {
  const services = [
    {
      title: "Academic Support",
      description: "Report issues related to assignments, exams, results, and syllabus.",
      icon: <AcademicIcon />
    },
    {
      title: "Facility Management",
      description: "Complaints about hostel, classroom, library, and lab facilities.",
      icon: <FacilityIcon />
    },
    {
      title: "Transport Services",
      description: "Issues related to campus buses, parking, and transportation.",
      icon: <TransportIcon />
    },
    {
      title: "Canteen & Food",
      description: "Feedback and complaints about campus food services.",
      icon: <CanteenIcon />
    },
    {
      title: "IT Support",
      description: "Technical issues with campus WiFi, computers, and software.",
      icon: <ITIcon />
    },
    {
      title: "Security Services",
      description: "Report security concerns, lost items, or safety issues.",
      icon: <SecurityIcon />
    },
    {
      title: "Medical Services",
      description: "Health-related concerns and medical facility issues.",
      icon: <MedicalIcon />
    },
    {
      title: "Finance & Fees",
      description: "Issues related to fees, scholarships, and financial matters.",
      icon: <FinanceIcon />
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
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/submit" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block">
            Submit a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
