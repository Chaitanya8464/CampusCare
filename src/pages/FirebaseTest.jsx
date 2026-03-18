import React, { useState } from "react";
import testFirebaseConnection from "../utils/testFirebase";

export default function FirebaseTest() {
  const [result, setResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    const testResult = await testFirebaseConnection();
    setResult(testResult);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Firebase Connection Test
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Test Firestore Connection
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Click the button below to test if Firebase Firestore is properly configured and accessible.
          </p>
          
          <button
            onClick={handleTest}
            disabled={testing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {testing ? "Testing..." : "Test Firebase Connection"}
          </button>

          {result && (
            <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              <p className="font-semibold">{result.success ? "✅ Success!" : "❌ Failed!"}</p>
              <p className="mt-2">{result.message}</p>
              {result.code && <p className="mt-1 text-sm">Error Code: {result.code}</p>}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Troubleshooting Steps
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
            <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Firebase Console</a></li>
            <li>Select your project: <strong>campuscare-3a887</strong></li>
            <li>Click on <strong>&quot;Firestore Database&quot;</strong></li>
            <li>If not created, click <strong>&quot;Create database&quot;</strong></li>
            <li>Choose <strong>&quot;Start in test mode&quot;</strong></li>
            <li>Go to <strong>&quot;Rules&quot;</strong> tab</li>
            <li>Make sure rules allow read/write (see below)</li>
          </ol>

          <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              rules_version = &apos;2&apos;;<br/>
              service cloud.firestore &#123;<br/>
              &nbsp;&nbsp;match /databases/&#123;database&#125;/documents &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;match /&#123;document=**&#125; &#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow read, write: if true;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
              &nbsp;&nbsp;&#125;<br/>
              &#125;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
