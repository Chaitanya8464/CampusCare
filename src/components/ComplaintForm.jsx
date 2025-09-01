import React, { useState } from "react";

export default function ComplaintForm() {
     const [anonymous, setAnonymous] =useState(false);

     return (
        <div className="min-h screen bg-gray-50 p-6">
           {/* Navbarr */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold flex item-center gap-2">
                    <span>file a Complain</span> CampusCare
                </h1>
                <div className="flex gap-3">
                <button className="px-4 py-1 bg-black text-white rounded-lg">Student View</button>
                <button className="px-4 py-1 border rounded-lg">Admin View</button>
            </div>
        </div>
        {/* Tabs*/}
        <div className="flex justify-center gap-6 mb-8">
            <button className="px-6 py-2 rounded-full bg-gray-100 flex items-center gap-2">Submit Complaint</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 flex items-center gap-2">Cancel</button>
            <button className="px-6 py-2 rounded-full bg-gray-100 flex items-center gap-2">Track Complaint</button>
        </div>
        {/* Complaint Form*/}
        <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-2">Submit a Grievance</h2>
            <p className="text-gray-500 mb-4">Report any issue or concern you have regarding campus facilities, services, or policies.</p>
        </div>
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="font-medium">Anonymous Submission</h3>
                <p className="text-gray-500 text-sm">Your identity will be kept confidential.</p>

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
                 anonymous ?"translate-x-5" : ""}`}></div>
            </label>
        </div>
            {/* form fields */}
            {! anonymous && (
                <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full border rounded-lg p-2 mb-3"
                />
            )}
            <input
            type="text"
            placeholder="Complaint title"
            className="w-full border rounded-lg p-2 mb-3"
            />
            <select className="w-full border rounded-lg p-2 mb-3">
                <option>Select priority level</option>
                <option> Low</option>
                <option> Medium</option>
                <option> High</option>
            </select>
            <input
            type="text"
            placeholder="Location"
            className="w-full border rounded-lg p-2 mb-3"
             />
             <textarea
                rows="4"
                placeholder="Provide a detailed description of your complaint..."
                className="w-full border rounded-lg p-2 mb-4"
              />

              {/*Submit button */}
              <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Submit Complaint

              </button>
                </div>


       

     );
}
