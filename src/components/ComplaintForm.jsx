import React, { useState } from "react";
import Slidebar from "./Slidebar";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ComplaintForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [issueRegarding, setIssueRegarding] = useState("");
  const [subIssue, setSubIssue] = useState("");
  const [otpMethod, setOtpMethod] = useState("");
  const [file, setFile] = useState(null);

  // Complaint details
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const options = {
    Academics: ["Assignments", "Exams", "Result", "Syllabus"],
    Facilities: ["Hostel", "Classroom", "Library", "Labs"],
    Services: ["Transport", "Canteen", "Medical", "IT Support"],
    Finance: [
      "Pending Fee Issue",
      "Fee Extension",
      "Scholarship Related",
      "Fee Adjustment Issue",
    ],
    Security: ["Lost / Found", "Theft", "Complaint", "Feedback (Security)"],
    Other: ["Miscellaneous", "Ragging", "Suggestion", "Feedback"],
  };

  // Generate Ticket ID
  const generateTicketId = () =>
    "CMP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

  // File validation
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 1024 * 1024) {
      setFile(selected);
      setErrorMsg("");
    } else {
      setErrorMsg("File must be PDF/JPEG and under 1MB.");
    }
  };

  // OTP mock
  const handleOtpRequest = () => {
    if (!otpMethod) {
      setErrorMsg("Please select Mobile or Email to receive OTP.");
      return;
    }
    alert(`OTP sent to your ${otpMethod}`);
  };

  // Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!issueRegarding || !subIssue || !title || !priority || !location || !description) {
      setErrorMsg("❌ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    console.log("=== SUBMITTING COMPLAINT ===");
    console.log("Current user email:", auth.currentUser?.email);
    console.log("Contact that will be saved:", anonymous ? null : contact);
    console.log("Form data:", {
      issueRegarding,
      subIssue,
      title,
      priority,
      location,
      description,
      anonymous,
      contact: anonymous ? null : contact
    });

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout. Please check your internet connection.")), 10000);
    });

    // Create the submit promise
    const submitPromise = (async () => {
      const newTicketId = generateTicketId();

      console.log("Creating document in Firestore...");
      const docData = {
        ticketId: newTicketId,
        contact: anonymous ? null : contact,
        userEmail: auth.currentUser?.email, // Add user email for easier querying
        issueRegarding,
        subIssue,
        title,
        priority,
        location,
        description,
        anonymous,
        otpMethod,
        fileName: file ? file.name : null,
        createdAt: serverTimestamp(),
        status: "Pending", // Explicitly set default status
      };
      console.log("Document data:", docData);

      const docRef = await addDoc(collection(db, "complaints"), docData);
      console.log("✅ Document written with ID:", docRef.id);

      return newTicketId;
    })();

    try {
      // Race between submit and timeout
      const newTicketId = await Promise.race([submitPromise, timeoutPromise]);

      setSuccessMsg(`✅ Complaint submitted! Ticket ID: ${newTicketId}`);

      // Reset form
      setAnonymous(false);
      setContact("");
      setIssueRegarding("");
      setSubIssue("");
      setTitle("");
      setPriority("");
      setLocation("");
      setDescription("");
      setOtpMethod("");
      setFile(null);

      // Clear success after 5s
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Submit error:", err);
      console.error("Error code:", err.code);
      console.error("Error type:", err.type);
      
      let errorMessage = "❌ Failed to submit: " + err.message;
      
      if (err.message.includes("timeout")) {
        errorMessage = "⚠️ Request timeout. Please check your internet connection.";
      } else if (err.code === "permission-denied") {
        errorMessage = "🔒 Permission denied. Please check Firestore security rules.";
      } else if (err.code === "unavailable") {
        errorMessage = "⚠️ Firestore is unavailable. Please try again later.";
      } else if (err.message.includes("offline")) {
        errorMessage = "⚠️ You appear to be offline. Please check your connection.";
      }
      
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-16 relative transition-colors duration-300">
      <Slidebar />

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Toast Messages */}
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {errorMsg}
        </div>
      )}

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow transition-colors duration-300"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Submit a Grievance</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Report any issue or concern you have regarding campus facilities,
          services, or policies.
        </p>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">Anonymous Submission</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your identity will be kept confidential.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-black"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
                anonymous ? "translate-x-5" : ""
              }`}
            ></div>
          </label>
        </div>

        {/* Contact Info */}
        {!anonymous && (
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-white mb-1">
              Contact Information <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
              required
            />
          </div>
        )}

        {/* Issue Regarding */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Issue Regarding<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
            value={issueRegarding}
            onChange={(e) => {
              setIssueRegarding(e.target.value);
              setSubIssue("");
            }}
            required
          >
            <option value="">--Select--</option>
            {Object.keys(options).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Sub-Issue */}
        {issueRegarding && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800 dark:text-white">
              Related Issue<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
              value={subIssue}
              onChange={(e) => setSubIssue(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              {options[issueRegarding].map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Complaint Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Complaint Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Complaint title"
            className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* Priority Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Priority Level<span className="text-red-500">*</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
            required
          >
            <option value="">Select priority level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Upload File (pdf/jpeg, Max 1MB)
          </label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
          />
          {file && <p className="text-green-600 dark:text-green-400 text-sm">File: {file.name}</p>}
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Detailed Description<span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of your complaint..."
            className="w-full border rounded-lg p-2 mb-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
            required
          />
        </div>

        {/* OTP Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800 dark:text-white">
            Receive OTP on<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-gray-800 dark:text-white">
              <input
                type="radio"
                name="otp"
                value="Mobile"
                checked={otpMethod === "Mobile"}
                onChange={(e) => setOtpMethod(e.target.value)}
              />
              Mobile
            </label>
            <label className="flex items-center gap-1 text-gray-800 dark:text-white">
              <input
                type="radio"
                name="otp"
                value="Email"
                checked={otpMethod === "Email"}
                onChange={(e) => setOtpMethod(e.target.value)}
              />
              Email
            </label>
            <button
              type="button"
              onClick={handleOtpRequest}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Click to get OTP
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-2 bg-black dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors duration-300"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
