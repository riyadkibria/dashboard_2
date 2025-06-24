"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection"; // ✅ Imported FAQ
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <main className="pt-24 flex-1">
        <HeroSection />
        <IntroSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection /> {/* ✅ Added FAQ here */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}
