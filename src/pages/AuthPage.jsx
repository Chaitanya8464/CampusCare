import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#fffcea] via-[#fffcea] to-[#b7e8eb]">
      {/* Waves */}
      <div className="absolute bottom-0 left-0 w-full h-[5%] bg-[#015871] overflow-hidden">
        <div className="absolute w-[6400px] h-[198px] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg')] animate-[wave_5s_linear_infinite] top-[-198px]" />
        <div className="absolute w-[6400px] h-[198px] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg')] animate-[wave_7s_linear_infinite] opacity-80 top-[-175px]" />
      </div>

      {/* Auth Card */}
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[60px] shadow-2xl overflow-hidden transition-all duration-500">
        {/* Sign In */}
        <SignInForm isSignUp={isSignUp} />

        {/* Sign Up */}
        <SignUpForm isSignUp={isSignUp} />

        {/* Overlay */}
        <OverlayPanel setIsSignUp={setIsSignUp} />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes wave {
          0% { margin-left: 0; }
          100% { margin-left: -1600px; }
        }
      `}</style>
    </div>
  );
}
