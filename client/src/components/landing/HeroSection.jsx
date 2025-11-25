import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function HeroSection() {
  const navigate = useNavigate();
  const fullText = "Create Magical Stories With Your Imagination ✨";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="landing-hero">
      <div className="landing-hero__container">
        <div className="landing-hero__content">
          <h1 className="landing-hero__title">
            {displayedText}
            <span className="landing-hero__cursor">|</span>
          </h1>
          <h2 className="landing-hero__subtitle">
            A joyful story world where creativity grows and values blossom.
          </h2>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/demo")}
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                border: "2px solid #fabe2c",
                background: "white",
                color: "#231f20",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(250, 190, 44, 0.2)",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#fabe2c";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(250, 190, 44, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "white";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(250, 190, 44, 0.2)";
              }}
            >
              🎭 View Live Demo
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #fabe2c 0%, #f4a61c 100%)",
                color: "#231f20",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(250, 190, 44, 0.3)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(250, 190, 44, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(250, 190, 44, 0.3)";
              }}
            >
              Get Started Free
            </button>
          </div>
        </div>
        <div className="landing-hero__image-wrapper">
          <img
            className="landing-hero__image"
            alt="A whimsical illustration of a child reading a glowing book surrounded by friendly characters and stars."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhwJAGOupJ5YAP4klLx7cFvmTPkP2Z_kbJqgphT2AX6u9q0edBuaL1kpiX0FB7uibhHroG2Tgc7G_fIzsyvQh506L-EXw9m71YahDfdMdbCmbxQwhHuzqU25zWSthUWB-ESO7EOKZe7dnSv3PiPEfXTFODPxL-4MlMTMXCoH-Rr0mEByIrWs7_IVBklt8rcCp_4nhB5q-yUbrVtcHO0gTiJWbWbtTjVAQmpS9OL1mZJO11h_QGIUmdIS9MoynOVThTnhX8IGd9MKoU"
          />
        </div>
      </div>
    </div>
  );
}
