"use client";

import { useState } from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaCheckCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">MySite</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#" className="hover:text-indigo-600">Home</a></li>
          <li><a href="#" className="hover:text-indigo-600">About</a></li>
          <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-gray-700 font-medium">
          <li><a href="#" className="block hover:text-indigo-600">Home</a></li>
          <li><a href="#" className="block hover:text-indigo-600">About</a></li>
          <li><a href="#" className="block hover:text-indigo-600">Contact</a></li>
        </ul>
      )}

      {/* Main Content */}
      <main className="flex-1">
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
            At MySite, we are passionate about crafting digital experiences that are not only beautiful,
            but also meaningful. Our team of designers and developers work together to bring your ideas
            to life — whether it’s a personal website, a full-blown ecommerce store, or a custom app.
            We believe in clean design, efficient code, and building with purpose.
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
              <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
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

        {/* Pricing Section */}
        <section className="bg-gray-50 px-6 py-12">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Our Plans</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$19/mo",
                features: ["1 Website", "Basic Support", "500MB Storage"],
              },
              {
                name: "Pro ★ Most Popular",
                price: "$49/mo",
                features: ["10 Websites", "Priority Support", "5GB Storage"],
                featured: true,
              },
              {
                name: "Enterprise",
                price: "$99/mo",
                features: ["Unlimited Sites", "24/7 Support", "50GB Storage"],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg shadow ${
                  plan.featured ? "bg-indigo-50 border-2 border-indigo-600" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-2xl text-indigo-600 font-bold mb-4">{plan.price}</p>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
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