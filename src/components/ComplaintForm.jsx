import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slidebar from "./Slidebar";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ComplaintForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [issueRegarding, setIssueRegarding] = useState("");
  const [subIssue, setSubIssue] = useState("");
  const [otpMethod, setOtpMethod] = useState("");
  const [file, setFile] = useState(null);
  const [ticketId, setTicketId] = useState("");

  // Complaint details
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

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
  const generateTicketId = () => {
    return "CMP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  };

  // File validation
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 1024 * 1024) {
      setFile(selected);
    } else {
      alert("File must be PDF/JPEG and under 1MB.");
    }
  };

  // OTP mock
  const handleOtpRequest = () => {
    if (!otpMethod) {
      alert("Please select Mobile or Email to receive OTP.");
      return;
    }
    alert(`OTP sent to your ${otpMethod}`);
  };

  // Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicketId = generateTicketId();

      await addDoc(collection(db, "complaints"), {
        ticketId: newTicketId,
        contact: anonymous ? null : contact,
        issueRegarding,
        subIssue,
        title,
        priority,
        location,
        description,
        anonymous,
        otpMethod,
        fileName: file ? file.name : null, // storing only file name
        createdAt: serverTimestamp(),
      });

      setTicketId(newTicketId);
      alert(`✅ Complaint submitted! Ticket ID: ${newTicketId}`);

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
    } catch (err) {
      alert("❌ Failed to submit: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-16">
      {/* Sidebar */}
      <Slidebar />

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow"
      >
        <h2 className="text-lg font-semibold mb-2">Submit a Grievance</h2>
        <p className="text-gray-500 mb-4">
          Report any issue or concern you have regarding campus facilities,
          services, or policies.
        </p>

        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Anonymous Submission</h3>
            <p className="text-gray-500 text-sm">
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
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black"></div>
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
            <label className="block text-sm font-medium mb-1">
              Contact Information <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full border rounded-lg p-2 mb-3"
              required
            />
          </div>
        )}

        {/* Issue Regarding */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Issue Regarding<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded-lg p-2 mb-3"
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
            <label className="block text-sm font-medium">
              Related Issue<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border rounded-lg p-2 mb-3"
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
          <label className="block text-sm font-medium">
            Complaint Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Complaint title"
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
        </div>

        {/* Priority Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Priority Level<span className="text-red-500">*</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
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
          <label className="block text-sm font-medium">
            Location<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Upload File (pdf/jpeg, Max 1MB)
          </label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mb-3"
          />
          {file && <p className="text-green-600 text-sm">File: {file.name}</p>}
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-medium">
            Detailed Description<span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of your complaint..."
            className="w-full border rounded-lg p-2 mb-4"
            required
          />
        </div>

        {/* OTP Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Receive OTP on<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="otp"
                value="Mobile"
                checked={otpMethod === "Mobile"}
                onChange={(e) => setOtpMethod(e.target.value)}
              />
              Mobile
            </label>
            <label className="flex items-center gap-1">
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
          className="w-full mt-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Submit Complaint
        </button>

        {ticketId && (
          <p className="mt-4 text-green-600 font-medium">
            ✅ Complaint submitted successfully! Ticket ID: {ticketId}
          </p>
        )}
      </form>
    </div>
  );
}
