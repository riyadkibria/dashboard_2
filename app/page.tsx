export default function Home() {
  return (
    <div className="page-wrapper">
      <nav className="main-navbar">
        <div className="site-logo">MySite</div>
        <ul className="nav-links">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
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

        <h1 className="hero-title">Welcome to MySite</h1>
        <p className="hero-subtext">We build awesome web experiences.</p>
        <button className="hero-button">Get Started</button>
      </section>
      <footer className="footer-section">
  <div className="footer-content">
    <p className="footer-text">© 2025 MySite. All rights reserved.</p>
    <ul className="footer-links">
      <li><a href="#" className="footer-link">Privacy Policy</a></li>
      <li><a href="#" className="footer-link">Terms of Service</a></li>
      <li><a href="#" className="footer-link">Contact</a></li>
    </ul>
  </div>
</footer>
    </div>
  );
}
