import React from "react";

export default function OverlayPanel({ setIsSignUp }) {
  return (
    <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-20">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white relative left-[-100%] w-[200%] h-full flex">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-2xl font-bold">Log In</h1>
          <p className="text-sm">Sign in here if you already have an account</p>
          <button
            className="mt-4 border border-white px-6 py-2 rounded-full font-bold uppercase text-sm"
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
        </div>
        {/* Right Panel */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm">Sign up if you still don’t have an account ...</p>
          <button
            className="mt-4 border border-white px-6 py-2 rounded-full font-bold uppercase text-sm"
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
