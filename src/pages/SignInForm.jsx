import react from "react";
import { Link } from "react-router-dom";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  app  from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function SignInForm(){
    const [email, setEmail]= useState("");
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [slide, setSlide]=useState(false)
    const [password,setPassword]= useState("");
    const [message, setMessage]= useState("");

    const navigataton =useNavigate();
    const swapNavigation =useNavigate();

    const handleSwap = (e) => {
        e.preventDefault();
        setSlide(true);
        setTimeout(()=> swapNavigation("/signup"),600);
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // User info
            const user = result.user;
            console.log("User signed in:", user);
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const handleSignIn =async (e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login Sucessfull");
            setTimeout(()=> navigataton("/"), 1500);
        }
        catch(err){
            setMessage("User Not Found" + err.message);
        }
        
    };

    return(
        <div className={`h-screen w-full flex transition-transform duration-700 ease-in-out ${slide ? "-translate-x-full" : "translate-x-0"}`}>
            <div className="h-screen w-full flex relative">
                <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-5 py-36 shadow-blue-500/50 bg-gradient-to-br from-gray-500 to-white-600 rounded-lg m-10">
                    <div className="w-lg mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 mt-20">
                        Welcome Back To CampusCare !
                        </h1>
                        <p className="text-white text-lg pt-4">
                                We're glad to see you again, Please enter your credentials to continue.
                        </p>
                    </div>

                </header>
                <section className="absolute top-0 right-0 h-full w-1/2 flex transition-all duration-700 py-24 px-12">
                   <div className="h-full w-1/2 flex flex-col justify-center text-center opacity-100 ml-80 px-8 py-20 shadow-blue-500 shadow-lg rounded-lg bg-gradient-to-br from-gray-500 to-white-600">
                       <h1 className="text-2xl font-bold text-white">SignIn</h1>
                       <div className="flex gap-3 my-4 justify-center items-center">
                        <a href="#x"
                        className="border rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition">
                            <img src={github} alt="github" className="w-10 h-10 rounded-full" />
                        </a>
                        <button 
                            onClick={handleGoogleLogin}
                            className="h-10 w-10 border rounded-full flex items-center justify-center hover:rotate-12 transition"
                        >
                            <img src={google} alt="google" className="w-10 h-10 rounded-full" />
                        </button>
                        <a href="#"
                        className="border rounded-full w-10 h-10 flex items-center justify-center hover:rotate-12 transition">
                            <img src={facebook} alt="facebook" className="w-10 h-10 rounded-full" />
                        </a>
                       </div> 
                        <span className="text-xs text-gray-800">Or, sign in using email address</span>
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
                        required />
                       
                       <input 
                       type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
                       required/>

                       <a href="#"
                       className="text-sm text-green--600 my-2" > Forget Password ?</a>
                       <button
                       onClick={handleSignIn}
                       className="w-full bg-blue-500 text-white rounded-full px-4 py-2 my-2 hover:shadow-lg"
                       >
                            Sign In
                       </button>
                       {message && <p className="mt-2 text-sm">{message}</p>}
                       <span className="text-xs text-white my-2">
                        Don't have an accound ?
                        <Link 
                        to={"/signup"}
                        onClick={handleSwap}
                        className="text-green-600 hover:underline ml-1"
                        >
                            Create New
                        </Link>
                       </span>
                    </div>

                </section>
            </div>

        </div>
    );
}