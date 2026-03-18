import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8"
          >
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Trusted by 10,000+ Students
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            <span className="text-black dark:text-white">
              Your Voice Matters
            </span>
            <br />
            <span className="text-black dark:text-white">
              Make It Heard
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            CampusCare empowers students to raise concerns, track resolutions,
            and build a better campus community together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 dark:from-white dark:to-gray-300 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "5K+", label: "Complaints Resolved" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              <span>
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to make your voice heard and issues resolved
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Easy Submission",
                description: "File complaints in just a few clicks with our intuitive form. Attach files and categorize issues effortlessly.",
                color: "from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300"
              },
              {
                icon: "🔍",
                title: "Real-time Tracking",
                description: "Monitor your complaint status live. Get instant notifications at every stage of resolution.",
                color: "from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300"
              },
              {
                icon: "🔒",
                title: "Anonymous Option",
                description: "Submit concerns anonymously. Your identity is protected with enterprise-grade security.",
                color: "from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300"
              },
              {
                icon: "⚡",
                title: "Fast Resolution",
                description: "Average resolution time of 48 hours. Priority handling for urgent matters.",
                color: "from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300"
              },
              {
                icon: "📊",
                title: "Transparent Process",
                description: "Complete visibility into the resolution process. Know who's handling your complaint.",
                color: "from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300"
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Our dedicated team is always ready to help you with any questions or concerns.",
                color: "from-indigo-500 to-blue-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative p-8 bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`}></div>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              <span>
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to get your issues resolved
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Submit Your Complaint",
                description: "Fill out a simple form with all the details. Choose anonymous or identified submission.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Track Progress",
                description: "Monitor your complaint status in real-time. Receive updates via email and notifications.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Get Resolution",
                description: "Authorities review and resolve your complaint. Rate the resolution and provide feedback.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500"></div>
                )}
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300 text-white rounded-full mb-6 shadow-lg">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border-2 border-blue-600">
                  <span className="text-sm font-bold text-blue-600">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
              <span>
                Loved by Students
              </span>
            </h2>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              See what our community has to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Aditi Sharma",
                role: "3rd Year, Computer Science",
                avatar: "👩‍🎓",
                content: "CampusCare transformed how we raise concerns. My hostel maintenance issue was resolved within 24 hours. Incredible!"
              },
              {
                name: "Rohan Patel",
                role: "2nd Year, Mechanical Engg",
                avatar: "👨‍🎓",
                content: "Finally, a transparent system where complaints actually get resolved. The tracking feature is super useful!"
              },
              {
                name: "Priya Singh",
                role: "Final Year, MBA",
                avatar: "👩‍💼",
                content: "As a student representative, CampusCare helps me track multiple issues efficiently. A must-have for every campus!"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.118 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-gray-300 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-800 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are actively improving their campus experience.
            Your voice matters &ndash; let&apos;s make it heard together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent text-gray-800 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-800 dark:border-white hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 dark:bg-black text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">CampusCare</h3>
              <p className="text-gray-300">Empowering students to build better campuses together.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-white transition">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
