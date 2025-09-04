import React from "react";  
import facebook from '../assets/facebook.png';
import google from '../assets/google.png';
import github from '../assets/github.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignInForm({ isSignUp}){
    const [slide, setSlide] = useState(false);
const navigate = useNavigate();

const handleSwap = (e) => {
  e.preventDefault();
  setSlide(true);
  setTimeout(() => navigate("/signup"), 600);
};
    return (
        <div
    className={`h-screen w-full flex transition-transform duration-700 ease-in-out 
      ${slide ? "-translate-x-full" : "translate-x-0"}`}
  >
        <div className="h-screen w-full flex relative">
            <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-5 py-36 shadow-lg shadow-blue-500/50 bg-gradient-to-br from-gray-500 to-white-600 rounded-lg m-10">
                <div className="w-lg mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mt-20">Welcome back to CampusCare !</h1>
                       <p className="text-white text-lg pt-4">We're glad to see you again. Please enter your credentials to continue.</p>

            </div>
            </header>

            <section className="absolute top-0 right-0 h-full w-1/2 flex transition-all duration-700 py-24 px-12 ">
            <div className="h-full w-1/2 flex flex-col justify-center text-center opacity-100  ml-80  px-8 py-20 shadow-blue-500 shadow-lg  rounded-lg shadow-blue-500 shadow-lg bg-gradient-to-br from-gray-500 to-white-600">
                <h1 className="text-2xl font-bold text-white">Sign In</h1>
                <div className="flex gap-3 my-4 justify-center items-center">
                    <a href="#" className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"><i className="fab fa-github"> <img src={github} alt="github" className="h-10 w-10 rounded-full" /></i></a>
                    <a href="#" className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"><i className="fab fa-google"> <img src={google} alt="google" className="h-10 w-10 rounded-full" /></i></a>
                    <a href="#" className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"><i className="fab fa-facebook"> <img src={facebook} alt="facebook" className="h-10 w-10 rounded-full" /></i></a>
                </div>
                <span className="text-xs text-gray-800">Or sign in using email address</span>
                <input type="email" placeholder="Email" className="w-full bg-gray-100 rounded-full px-4 py-2 my-2" />
                <input type="password" placeholder="Password" className="w-full bg-gray-100 rounded-full px-4 py-2 my-2" />
                <a href="#" className="text-sm text-green-600 my-2">Forgot Password?</a>
                <button className="w-full bg-blue-500 text-white rounded-full px-4 py-2 my-2  hover:shadow-lg">Sign In</button>
                <span className="text-xs text-white my-2">Don't have an account? 
                    <Link 
                    to="/signup"
                    onClick={handleSwap}
                     className="text-green-600 hover:underline">
                        Create New
                        </Link>
                </span>
            </div>
            </section>
        </div>
</div>
    )
}