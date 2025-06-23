"use client";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Navbar */}
      <nav className="main-navbar">
        <div className="site-logo">MySite</div>
        <ul className="nav-links">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Welcome to MySite</h1>
          <p className="hero-subtext">We build awesome web experiences.</p>
          <button className="hero-button">Get Started</button>
        </section>

        {/* 🔥 New Intro Section */}
        <section className="intro-section">
          <h2 className="intro-title">Who We Are</h2>
          <p className="intro-paragraph">
            At MySite, we are passionate about crafting digital experiences that are not only beautiful,
            but also meaningful. Our team of designers and developers work together to bring your ideas
            to life — whether it’s a personal website, a full-blown ecommerce store, or a custom app.
            We believe in clean design, efficient code, and building with purpose.
          </p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="features-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-heading">Fast</h3>
              <p className="feature-description">Quick load times and lag-free interaction.</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-heading">Responsive</h3>
              <p className="feature-description">Looks great on all screen sizes.</p>
            </div>
            <div className="feature-card">
              <h3 className="feature-heading">Modern</h3>
              <p className="feature-description">Built with the latest technologies.</p>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-subtext">Subscribe to our newsletter to get the latest updates.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </section>
        {/* Pricing Section */}
<section className="pricing-section">
  <h2 className="pricing-title">Our Plans</h2>
  <div className="pricing-grid">
    {/* Basic Plan */}
    <div className="pricing-card">
      <h3 className="pricing-name">Basic</h3>
      <p className="pricing-price">$19<span className="text-sm text-gray-500">/mo</span></p>
      <ul className="pricing-features">
        <li>1 Website</li>
        <li>Basic Support</li>
        <li>500MB Storage</li>
      </ul>
      <button className="pricing-button">Choose Plan</button>
    </div>

    {/* Pro Plan */}
    <div className="pricing-card featured">
      <h3 className="pricing-name">Pro</h3>
      <p className="pricing-price">$49<span className="text-sm text-gray-500">/mo</span></p>
      <ul className="pricing-features">
        <li>10 Websites</li>
        <li>Priority Support</li>
        <li>5GB Storage</li>
      </ul>
      <button className="pricing-button">Choose Plan</button>
    </div>

    {/* Enterprise Plan */}
    <div className="pricing-card">
      <h3 className="pricing-name">Enterprise</h3>
      <p className="pricing-price">$99<span className="text-sm text-gray-500">/mo</span></p>
      <ul className="pricing-features">
        <li>Unlimited Sites</li>
        <li>24/7 Support</li>
        <li>50GB Storage</li>
      </ul>
      <button className="pricing-button">Choose Plan</button>
    </div>
  </div>
</section>

      </main>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <p className="footer-text">© 2025 MySite. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
          <div className="footer-social">
            <a
              href="https://facebook.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
