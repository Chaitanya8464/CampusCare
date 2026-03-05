import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I submit a complaint?",
      answer: "Navigate to the 'Submit Complaint' page, fill in the required details including the issue category, title, description, and optionally upload supporting documents. You can choose to submit anonymously or with your identity."
    },
    {
      question: "Can I submit complaints anonymously?",
      answer: "Yes! You have the option to submit complaints anonymously. Your identity will be kept confidential, and you'll still receive a ticket ID to track your complaint."
    },
    {
      question: "How do I track my complaint status?",
      answer: "Go to the 'Track Complaints' page and enter your ticket ID. You can also view all your recent complaints and their current status from your dashboard."
    },
    {
      question: "What happens after I submit a complaint?",
      answer: "Your complaint is assigned a unique ticket ID and forwarded to the relevant department. You'll receive updates as the complaint moves through different stages: Pending → In Progress → Resolved."
    },
    {
      question: "How long does it take to resolve a complaint?",
      answer: "Resolution time varies based on the nature and priority of the complaint. High-priority issues are addressed within 24-48 hours, while standard complaints may take 3-5 business days."
    },
    {
      question: "Can I upload supporting documents?",
      answer: "Yes, you can upload PDF or JPEG files (max 1MB) as evidence or supporting documentation for your complaint."
    },
    {
      question: "What if I'm not satisfied with the resolution?",
      answer: "If you're not satisfied with the resolution, you can submit a new complaint referencing the original ticket ID, or contact the support team directly through the Contact page."
    },
    {
      question: "Who can use CampusCare?",
      answer: "CampusCare is available to all students, faculty, and staff members of the institution. You need to create an account to submit and track complaints."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12">
          Find answers to common questions about CampusCare.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">Q:</span>
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 ml-6">
                <span className="text-green-600 dark:text-green-400 font-semibold mr-2">A:</span>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions?</p>
          <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
