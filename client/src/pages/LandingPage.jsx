import HeroSection from "../components/landing/HeroSection";
import PromptInputSection from "../components/landing/PromptInputSection";
import GenreHighlights from "../components/landing/GenreHighlights";
import WhatMakesUsSpecial from "../components/landing/WhatMakesUsSpecial";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import "../components/landing/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <main>
        <div className="landing-layout-container">
          <div className="landing-layout-flex">
            <div className="landing-layout-content">
              <HeroSection />
              <PromptInputSection />
              <GenreHighlights />
              <WhatMakesUsSpecial />
              <HowItWorks />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

