import React from "react";
import { Link } from "react-router-dom";

import unic from "../assets/unicae3.jpg"

export default function LandingPage() {
  return (
    <div className=" flex flex-col ">
      {/* Navbar */}
    

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-10 py-36  ">
        
        <div className="max-w-lg ">
          <h2 className="text-4xl font-extrabold text-blue-300 mb-4">
            Welcome to CampusCare
          </h2>
          <p className="text-lg text-white mb-6">
            A smart platform for students and faculty to submit and track
            complaints, ensuring a better and smoother campus experience.
            
          </p>
          <Link
            to="/submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Submit Complaint
          </Link>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src={unic}
            alt="Campus illustration"
            className="w-500 h-80 object-cover rounded-full shadow-lg"
          />
        </div>
      </header>


      <section className=" py-12 px-10">
        <h3 className="text-3xl font-bold text-center  text-blue-700 mb-10">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center h-40">
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100 ">
            <h4 className="text-xl font-semibold mb-2">1. Submit</h4>
            <p className="text-gray-600">
              File a complaint online in just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100">
            <h4 className="text-xl font-semibold mb-2">2. Track</h4>
            <p className="text-gray-600">
              Monitor the progress of your complaint in real-time.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100">
            <h4 className="text-xl font-semibold mb-2">3. Resolve</h4>
            <p className="text-gray-600">
              Get timely updates and resolution from authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className=" py-12 px-10">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">
          What Students Say
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-blue-100 rounded-xl shadow">
            <p className="text-gray-700 italic">
              "CampusCare made it so easy for me to raise issues in my hostel
              and track them. Super helpful!"
            </p>
            <h5 className="mt-4 font-bold text-blue-700">- Aditi, 3rd Year</h5>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow">
            <p className="text-gray-700 italic">
              "Finally, a transparent system where complaints actually get
              resolved. CampusCare is amazing!"
            </p>
            <h5 className="mt-4 font-bold text-blue-700">- Rohan, 2nd Year</h5>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className=" py-12 px-10 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Need Help?</h3>
        <p className="text-gray-600 mb-6">
          Have questions or facing issues? Reach out to us anytime.
        </p>
        <Link
          to="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </section>


      {/* Features Section */}
      <section className=" py-12 px-10">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Why Choose CampusCare?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center h-80">
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100 transition transform hover:-y-6 hover:-xl ">
            <h4 className="text-xl font-semibold mb-2">Easy Complaint Submission</h4>
            <p className="text-gray-600">
              Students can submit complaints in just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100 transition transform hover:-y-6 hover:-xl ">
            <h4 className="text-xl font-semibold mb-2">Real-time Tracking</h4>
            <p className="text-gray-600">
              Track the status of your complaint anytime, anywhere.
            </p>
          </div>
          <div className="p-6 bg-blue-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/100 transition transform hover:-y-6 hover:-xl ">
            <h4 className="text-xl font-semibold mb-2">Transparent Process</h4>
            <p className="text-gray-600">
              Ensure accountability and timely resolution of issues.
            </p>
          </div>
        </div>
      </section>

      

      {/* Footer */}

      <footer className="bg-gray-800 text-white text-center border-t border-gray-700 py-4 mt-auto rounded-tl-[100px]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-2">
           
            {/* Logo/ brand*/}

            <div>
                <h2 className="text-xl font-bold mb-2">CampusCare</h2>
               <p className="text-gray-600">Your one-stop solution for campus issues.</p>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <ul className="text-gray-600">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="text-gray-600">
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/support">Support</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-3">Follow Us</h3>
                        <ul className="text-gray-600">
                            <li><Link to="/facebook">Facebook</Link></li>
                            <li><Link to="/twitter">Twitter</Link></li>
                            <li><Link to="/instagram">Instagram</Link></li>
                        </ul>
                    </div>
                
        </div>
        <div className="border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
            <p className=" text-centr gap-4">© {new Date().getFullYear()} CampusCare. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-blue-300">Facebook</a>
            <a href="#" className="hover:text-blue-300">Twitter</a>
            <a href="#" className="hover:text-blue-300">Instagram</a>
        </div>
        
        </div>
      </footer>

    </div>
  );
}
