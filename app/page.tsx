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
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
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

        {loading ? (
          <p className="text-center py-10 text-gray-600">Loading pricing...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">Error: {error}</p>
        ) : (
          <PricingSection products={products} />
        )}

        <FAQSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
