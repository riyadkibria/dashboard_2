"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaCheckCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">MySite</div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#" className="hover:text-indigo-600">Home</a></li>
          <li><a href="#" className="hover:text-indigo-600">About</a></li>
          <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
        </ul>

        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {menuOpen && (
        <ul className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 space-y-4 text-gray-700 font-medium fixed top-[72px] left-0 right-0 z-40">
          <li><a href="#" className="block hover:text-indigo-600">Home</a></li>
          <li><a href="#" className="block hover:text-indigo-600">About</a></li>
          <li><a href="#" className="block hover:text-indigo-600">Contact</a></li>
        </ul>
      )}

      <main className="pt-24 flex-1">
        {/* Hero Section */}
        <section className="text-center px-4 py-16 bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to MySite</h1>
          <p className="mt-4 text-gray-600">We build awesome web experiences.</p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Get Started
          </button>
        </section>

        {/* Intro Section */}
        <section className="px-6 py-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-gray-600">
            At MySite, we build digital products that are clean, fast, and built with purpose. Whether it’s a personal website or a full-blown ecommerce store, our team is ready.
          </p>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Fast", desc: "Quick load times and lag-free interaction." },
              { title: "Responsive", desc: "Looks great on all screen sizes." },
              { title: "Modern", desc: "Built with the latest technologies." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Stay Updated</h2>
          <p className="text-gray-600 mt-2 mb-4">
            Subscribe to our newsletter to get the latest updates.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 border rounded w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* ✅ Sleek Pricing Section */}
        <section className="bg-white px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Plans</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$19/mo",
                features: ["1 Website", "Basic Support", "500MB Storage"],
                badge: "",
                gradient: "bg-white",
              },
              {
                name: "Pro",
                price: "$49/mo",
                features: ["10 Websites", "Priority Support", "5GB Storage"],
                badge: "Most Popular",
                gradient: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white",
              },
              {
                name: "Enterprise",
                price: "$99/mo",
                features: ["Unlimited Sites", "24/7 Support", "50GB Storage"],
                badge: "",
                gradient: "bg-white",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl shadow-lg transform transition hover:scale-105 ${plan.gradient}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-sm font-semibold text-black px-4 py-1 rounded-full shadow">
                    ⭐ {plan.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                <p className="text-center text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full px-4 py-2 rounded-lg font-semibold ${
                    plan.gradient.includes("gradient")
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  } transition`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">© 2025 MySite. All rights reserved.</p>
          <ul className="flex space-x-4 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}