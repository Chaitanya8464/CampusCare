import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Privacy Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Last updated: March 5, 2026</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Name and email address when you create an account</li>
              <li>Complaint details and supporting documents you submit</li>
              <li>Communication preferences and settings</li>
              <li>Usage data and analytics information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Provide, maintain, and improve CampusCare services</li>
              <li>Process and track your complaints</li>
              <li>Send you updates and notifications about your complaints</li>
              <li>Respond to your comments and questions</li>
              <li>Protect the rights and property of CampusCare and users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">3. Anonymous Submissions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You have the option to submit complaints anonymously. When you choose this option, your identity 
              will not be shared with the parties handling your complaint. However, some identifying information 
              may still be stored securely for administrative purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">4. Information Sharing</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
              <li>To authorized campus personnel who need to handle your complaints</li>
              <li>When required by law or to protect rights and safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">5. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized 
              access, alteration, disclosure, or destruction. This includes encryption, secure servers, and 
              restricted access controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">6. Cookies and Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300">
              CampusCare uses cookies and similar technologies to enhance user experience, analyze site usage, 
              and facilitate certain site functions. You can choose to disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">7. Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">8. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@campuscare.edu" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@campuscare.edu
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
