import React from "react";

export default function Signup(){
    return(
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
            <form className="space-y-4">
                <input
                 type="text"
                 placeholder="Name"
                 className="w-full border px-3 py-2 rounded-lg"
                 />
                <input
                 type="text"
                 placeholder="Email"
                 className="w-full border px-3 py-2 rounded-lg"
                 />
                 <input
                 type="password"
                 placeholder="Password"
                 className="w-full border px-3 py-2 rounded-lg"
                 />
                 <button className="w-full bg-black text-white py-2 rounded-lg">
                    Sign Up
                 </button>
            </form>

        </div>
    )
}