import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/landing/HeroSection";
import PromptInputSection from "../components/landing/PromptInputSection";
import GenreHighlights from "../components/landing/GenreHighlights";
import WhatMakesUsSpecial from "../components/landing/WhatMakesUsSpecial";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import GeneratedStoryDisplay from "../components/GeneratedStoryDisplay";
import AudioCloneSection from "../components/AudioCloneSection";
import "../components/landing/landing.css";

export default function LandingPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [storyId, setStoryId] = useState(null);
  const [showAudioSection, setShowAudioSection] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleStoryGenerated = (result) => {
    // result now contains { story: "text...", storyId: "id..." }
    setGeneratedStory(result.story);
    setStoryId(result.storyId);
    setShowAudioSection(false); // Reset audio section when new story is generated

    // Scroll to the generated story section
    setTimeout(() => {
      const storySection = document.querySelector(".story-display");
      if (storySection) {
        storySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleUseForAudio = () => {
    setShowAudioSection(true);

    // Scroll to audio section
    setTimeout(() => {
      const audioSection = document.querySelector(".audio-clone");
      if (audioSection) {
        audioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="landing-page">
      <main>
        <div className="landing-layout-container">
          <div className="landing-layout-flex">
            <div className="landing-layout-content">
              <HeroSection />
              <PromptInputSection
                selectedGenre={selectedGenre}
                onStoryGenerated={handleStoryGenerated}
              />
              <div id="genres">
                <GenreHighlights
                  selectedGenre={selectedGenre}
                  onGenreSelect={handleGenreSelect}
                />
              </div>

              {/* Display Generated Story - Between GenreHighlights and WhatMakesUsSpecial */}
              {generatedStory && (
                <div style={{ margin: "60px 0" }}>
                  <GeneratedStoryDisplay
                    story={generatedStory}
                    onUseForAudio={handleUseForAudio}
                  />
                </div>
              )}

              {/* Audio Clone Section */}
              {showAudioSection && generatedStory && (
                <div style={{ margin: "60px 0" }}>
                  <AudioCloneSection
                    storyText={generatedStory}
                    storyId={storyId}
                  />
                </div>
              )}

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
