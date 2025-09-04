import React from "react";

export default function SignUpForm({ isSignUp}){
    return(
        <div className={`absolute top-0 h-full w-1/2 flex flex-col justify-center items-center text-center transition-all duration-700 ${
            isSignUp ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0" }
        `}>
            <h1 className="text-2xl font-bold">SignUp</h1>
            <div className="flex gap-3 my-4">
                <a href="#"
                 className="border border-blue-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition">
                    <i className="fab fa-github">
                        </i>
                        </a>
                <a href="#" className="border border-blue-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#" className="border border-blue-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition">
                    <i className="fab fa-facebook"></i>
                </a>
            </div>
            <span className="text-xs text-gray-600">Or use your email for registration</span>
            <input type="text" placeholder="Name" className="w-full bg-gray-100 rounded-full px-4 py-2 my-2" />
            <input type="email" placeholder="Email" className="w-full bg-gray-100 rounded-full px-4 py-2 my-2" />
            <input type="password" placeholder="Password" className="w-full bg-gray-100 rounded-full px-4 py-2 my-3"/>
            <button 
            className="bg-blue-500 text-white text-center rounded-full font-bold uppercase text-sm hover:scale-95 transition ">
                Sign Up
            </button>

        </div>
    )

}