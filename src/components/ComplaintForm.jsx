import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function ComplaintForm() {
     const [anonymous, setAnonymous] =useState(false);

     return (
        <div className="min-h screen bg-gray p-6">
           {/* Navbar */}
            
        {/* Tabs*/}
         <div className="flex justify-center gap-6 mb-8">
            <Link to="/"
             className="px-6 py-2 rounded-full bg-black text-white flex items-center gap-2"
             >Submit Complaint</Link>
           
            <Link 
            to="/track"
             className="px-6 py-2 rounded-full bg-gray-100 flex items-center gap-2"
             >
                Track Complaint
            </Link>
             <Link 
            to="/cancel" 
            className="px-6 py-2 rounded-full bg-black-100 text-color-white-100 flex items-center gap-2"
            >
                Cancel
            </Link>
        </div>
        {/* Complaint Form*/}
        <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-2xl shadow">
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
                <div>
              <label data-slot="label" class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" for="contact">Contact Information <span className="text-red-500">*</span></label>

                <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full border rounded-lg p-2 mb-3"
                />
                </div>
            )}
            <div className="space-y-2">
                <label data-slot="label" class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" for="contact">Complaint Title<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    required
                    placeholder="Complaint title"
                    className="w-full border rounded-lg p-2 mb-3"
                />
            </div>
            <div className="space-y-2">
                <label data-slot="label" class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" for="priority">Priority Level<span className="text-red-500">*</span></label>
                <select className="w-full border rounded-lg p-2 mb-3">
                    <option>Select priority level</option>
                    <option> Low</option>
                    <option> Medium</option>
                    <option> High</option>
            </select>
            </div>
            <div className="space-y-2">
                <label data-slot="label" class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" for="location">Location<span className="text-red-500">*</span></label>
                <input
                    type="text"
                    placeholder="Location"
                    className="w-full border rounded-lg p-2 mb-3"
                />
            </div>

            <div>
                <label data-slot="label" class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" for="priority">Detailed Description<span className="text-red-500">*</span></label>

             <textarea
                rows="4"
                placeholder="Provide a detailed description of your complaint..."
                className="w-full border rounded-lg p-2 mb-4"
              />
            </div>
              {/*Submit button */}
              <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                Submit Complaint

              </button>
                </div>
        </div>


       

     );
}
