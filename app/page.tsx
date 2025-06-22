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
        <h1 className="hero-title">Welcome to MySite</h1>
        <p className="hero-subtext">We build awesome web experiences.</p>
        <button className="hero-button">Get Started</button>
      </section>
    </div>
  );
}
