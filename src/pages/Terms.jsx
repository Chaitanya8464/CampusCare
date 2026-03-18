import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center mb-4">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Last updated: March 5, 2026</p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using CampusCare, you accept and agree to be bound by the terms and provisions 
              of this agreement. If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Permission is granted to temporarily access CampusCare for personal, non-commercial transitory 
              viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">3. User Responsibilities</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Users are responsible for maintaining the confidentiality of their account credentials and for 
              all activities that occur under their account. Users agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Submit genuine complaints and not misuse the platform</li>
              <li>Not submit false or misleading information</li>
              <li>Not use the platform for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">4. Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
              of CampusCare, to understand our practices regarding the collection and use of personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">5. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The materials on CampusCare are provided on an &apos;as is&apos; basis. CampusCare makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">6. Limitations</h2>
            <p className="text-gray-600 dark:text-gray-300">
              In no event shall CampusCare or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit) arising out of the use or inability to use 
              CampusCare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">7. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              CampusCare may revise these terms of service at any time without notice. By using this website 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
