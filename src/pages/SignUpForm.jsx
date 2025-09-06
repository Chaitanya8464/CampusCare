import react from "react";
import google from "../assets/google.png"
import github from "../assets/github.png"
import  facebook from "../assets/facebook.png"
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { transform } from "framer-motion";

export default function SignUpForm(){
    const [slide, setSlide]=useState(false);
    const [fullName, setFullName] = useState();
    
    const [email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=("")
    const [message, setMessage]= useState("");

    const swapNavigation= useNavigate();
    const navigate =useNavigate();

    const handleSwap = (e)=>{
      e.preventDefault();
      setSlide(true);
      setTimeout(()=>swapNavigation("/login"),600);

    }
    const handleSignUp =async (e)=>{
      e.preventDefault();
      try{
        await createUserWithEmailAndPassword(auth, email,password);
        alert("Account created successfully !");
      }
      catch(error){
        alert("User not Found" + error.message)
      }
    }
      return(
        <div className={`h-screen w-full flex transition-transform  duration-700 easy-in-out ${slide ? "-translate-x-full" : "translate-x-0"} `}>
            <header className=" w-full flex flex-col mt-20 px-5 py-24 bg-gradient-to-br from-gray-800 to-white-600 rounded-lg shadow-red-500/50 shadow-lg m-10 ">
             <section className="absolute top-0 left-0  h-full w-1/2 flex transition-all duration-700 py-24 px-12">
                   <div className="h-full w-1/2 flex flex-col justify-center text-center opacity-100 ml-10 mt-5 px-8 py-20 shadow-red-500 shadow-lg rounded-lg bg-gradient-to-br from-gray-500 to-white-600">
                       <h1 className="text-2xl font-bold text-white">SignUp</h1>
                       <div className="flex gap-3 my-4 justify-center items-center">
                        <a href="#"
                        className="border rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition">
                            <img src={github} alt="github" className="w-10 h-10 rounded-full" />
                        </a>
                        <a href="#" 
                        className="h-10 w-10 border rounded-full flex items-center justify-center hover:rotate-12 transition">
                            <img src={google} alt="google" className="w-10 h-10 rounded-full"></img>
                        </a>
                        <a href="#"
                        className="border rounded-full w-10 h-10 flex items-center justify-center hover:rotate-12 transition">
                            <img src={facebook} alt="facebook" className="w-10 h-10 rounded-full" />
                        </a>
                       </div> 
                        <span className="text-xs text-gray-800">Or, sign up using email address</span>
                        <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
                        required
                        />
                        
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
                        required />
                       <input 
                       type="Password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
                       required/>
                       <input 
                       type="password"
                       placeholder="Confirm Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-gray-100 rounded-full px-4 py-2 my-1"
                       required/>

                       
                       <button
                       onClick={handleSignUp}
                       className="w-full bg-blue-500 text-white rounded-full px-4 py-2 my-2 hover:shadow-lg"
                       >
                            Sign Up
                       </button>
                       {message && <p className="mt-2 text-sm">{message}</p>}
                       <span className="text-xs text-white my-2">
                        Already have an account ?
                        <Link 
                        to={"/login"}
                        onClick={handleSwap}
                        className="text-green-600 hover:underline ml-1"
                        >
                            Log In
                        </Link>
                       </span>
                    </div>
                     </section>
                     <div className="w-lg flex flex-col justify-center items-center ml-80">
                      <h1 className="text-4xl font-bold text-gray-800 mt-20">
                      Join CampusCare Today !
                      </h1>
                      <p className="text-white text-lg pt-4">
                        Create your account to get started and be part of our community.
                      </p>
                     </div>
                 </header>
        </div>
      );
}
