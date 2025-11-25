import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import confetti from "canvas-confetti";
import { getUserStories } from "../services/operations/storyAPI";
import "./Certificates.css";

// Import Badge SVGs
import beginnerBadge from "../assets/badges/beginner.svg";
import enthusiastBadge from "../assets/badges/enthusiast.svg";
import masterBadge from "../assets/badges/master.svg";

// Define all possible badges/certificates based on milestones
const allBadges = [
  {
    id: 1,
    title: "Story Beginner",
    description: "For creating your first story.",
    minStories: 1,
    image: beginnerBadge,
    emoji: "🌟",
  },
  {
    id: 2,
    title: "Story Enthusiast",
    description: "For creating 3 or more stories.",
    minStories: 3,
    image: enthusiastBadge,
    emoji: "✨",
  },
  {
    id: 3,
    title: "Master Storyteller",
    description: "For creating 5 or more stories.",
    minStories: 5,
    image: masterBadge,
    emoji: "🏅",
  },
];

function Certificates() {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAndCalculateBadges = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const userStories = await getUserStories(token);
        const storyCount = userStories.length;

        // Filter badges user has earned based on story count
        const earned = allBadges.filter(
          (badge) => storyCount >= badge.minStories
        );
        setEarnedBadges(earned);
      } catch (error) {
        console.error("Failed to fetch badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCalculateBadges();
  }, [token]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fabe2c", "#ffd95e", "#231f20", "#ffffff"],
    });
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const handleDownload = () => {
    if (!selectedCertificate) return;
    
    const link = document.createElement("a");
    link.href = selectedCertificate.image;
    link.download = `${selectedCertificate.title.replace(/\s+/g, "_")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section className="card certificates">
        <header className="card__heading">
          <h3>Certificates Earned</h3>
        </header>
        <div className="certificates__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Loading certificates...
          </p>
        </div>
      </section>
    );
  }

  if (earnedBadges.length === 0) {
    return (
      <section className="card certificates">
        <header className="card__heading">
          <h3>Certificates Earned</h3>
        </header>
        <div className="certificates__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Create your first story to earn your first certificate!
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="card certificates">
        <header className="card__heading">
          <h3>Certificates Earned</h3>
        </header>
        <div className="certificates__list">
          {earnedBadges.map((certificate) => (
            <div key={certificate.id} className="certificates__item">
              <div className="certificates__badge">
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "5px" }} 
                />
              </div>
              <div className="certificates__details">
                <h4>{certificate.title}</h4>
                <p>{certificate.description}</p>
              </div>
              <button 
                type="button" 
                className="certificates__button"
                onClick={() => handleViewCertificate(certificate)}
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedCertificate && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            
            <div className="certificate-display">
              <div className="certificate-image-container">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.title} 
                  className="certificate-image"
                />
              </div>
              <div>
                <h2 className="certificate-title">{selectedCertificate.title}</h2>
                <p className="certificate-desc">{selectedCertificate.description}</p>
              </div>
              
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleDownload}>
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Certificates;
