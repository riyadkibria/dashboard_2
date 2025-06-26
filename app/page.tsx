"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products'); // Create an API route to fetch Contentful data
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <main className="pt-24 flex-1">
        <HeroSection />
        <IntroSection />
        <FeaturesSection />
        <PricingSection products={products} /> {/* Pass products here */}
        <FAQSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
