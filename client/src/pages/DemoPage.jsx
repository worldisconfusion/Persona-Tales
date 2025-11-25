import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { demoUser, demoStories, demoBadges, demoStats } from "../data/demoData";

// Import Badge SVGs
import beginnerBadge from "../assets/badges/beginner.svg";
import enthusiastBadge from "../assets/badges/enthusiast.svg";
import masterBadge from "../assets/badges/master.svg";

const badgeImages = {
  1: beginnerBadge,
  2: enthusiastBadge,
  3: masterBadge,
};

function DemoPage() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const avatarUrl = useMemo(() => {
    const seed = [demoUser.firstName, demoUser.lastName].join(" ");
    return `https://api.dicebear.com/5.x/initials/svg?seed=${seed}`;
  }, []);

  const handleReadStory = (story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
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
    link.href = badgeImages[selectedCertificate.id];
    link.download = `${selectedCertificate.title.replace(/\s+/g, "_")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard">
      {/* Demo Mode Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "16px 24px",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        🎭 Demo Mode - Exploring Persona Tales Features
        <Link
          to="/signup"
          style={{
            marginLeft: "16px",
            background: "white",
            color: "#667eea",
            padding: "8px 20px",
            borderRadius: "20px",
            fontWeight: 700,
            fontSize: "14px",
            display: "inline-block",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Create Your Own Stories →
        </Link>
      </div>

      <div className="dashboard__container">
        {/* Header */}
        <header className="dashboard__header">
          <div>
            <h1 className="dashboard__title">
              {greeting}, {demoUser.firstName}! 👋
            </h1>
            <p className="dashboard__subtitle">
              Welcome back to your storytelling journey
            </p>
          </div>
          <img
            src={avatarUrl}
            alt={`${demoUser.firstName} ${demoUser.lastName}`}
            className="dashboard__avatar"
          />
        </header>

        <div className="dashboard__grid">
          {/* Left Column */}
          <div className="dashboard__column">
            {/* Profile Card */}
            <section className="card profile">
              <div className="profile__avatar-wrapper">
                <img
                  src={avatarUrl}
                  alt={`${demoUser.firstName} ${demoUser.lastName}`}
                  className="profile__avatar"
                />
              </div>
              <div className="profile__info">
                <h2 className="profile__name">
                  {demoUser.firstName} {demoUser.lastName}
                </h2>
                <p className="profile__email">{demoUser.email}</p>
                <span className="profile__badge">{demoUser.accountType}</span>
              </div>
            </section>

            {/* Story Statistics */}
            <section className="card stats">
              <header className="card__heading">
                <h3>Your Statistics</h3>
              </header>
              <div className="stats__grid">
                <div className="stats__item">
                  <div className="stats__icon">📚</div>
                  <div>
                    <p className="stats__label">Stories Created</p>
                    <p className="stats__value">{demoStats.totalStories}</p>
                  </div>
                </div>
                <div className="stats__item">
                  <div className="stats__icon">⭐</div>
                  <div>
                    <p className="stats__label">Favorite Genre</p>
                    <p className="stats__value">{demoStats.favoriteGenre}</p>
                  </div>
                </div>
                <div className="stats__item">
                  <div className="stats__icon">✍️</div>
                  <div>
                    <p className="stats__label">Total Words</p>
                    <p className="stats__value">{demoStats.totalWords}</p>
                  </div>
                </div>
                <div className="stats__item">
                  <div className="stats__icon">🎉</div>
                  <div>
                    <p className="stats__label">Member Since</p>
                    <p className="stats__value">{demoStats.memberSince}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="dashboard__column dashboard__column--wide">
            {/* Certificates */}
            <section className="card certificates">
              <header className="card__heading">
                <h3>Certificates Earned</h3>
              </header>
              <div className="certificates__list">
                {demoBadges.map((certificate) => (
                  <div key={certificate.id} className="certificates__item">
                    <div className="certificates__badge">
                      <img
                        src={badgeImages[certificate.id]}
                        alt={certificate.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "5px",
                        }}
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

            {/* Recent Stories */}
            <section className="card stories">
              <header className="card__heading">
                <h3>Recent Stories</h3>
              </header>
              <div className="stories__list">
                {demoStories.map((story) => (
                  <div key={story._id} className="stories__item">
                    <div>
                      <h4>{story.title}</h4>
                      <p>{story.genre}</p>
                    </div>
                    <button
                      type="button"
                      className="stories__button"
                      onClick={() => handleReadStory(story)}
                    >
                      Read Again
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Motivational Banner */}
        <section className="motivational-banner">
          <div className="motivational-banner__content">
            <h3 className="motivational-banner__title">
              Keep Creating Amazing Stories! ✨
            </h3>
            <p className="motivational-banner__text">
              Your imagination knows no bounds. Each story you create adds to
              your unique narrative collection.
            </p>
          </div>
        </section>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div
          className="story-modal-overlay"
          onClick={closeStoryModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="story-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "800px",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              onClick={closeStoryModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                padding: "5px 10px",
              }}
            >
              ×
            </button>
            <h2 style={{ marginBottom: "15px", color: "#1a1a1a" }}>
              {selectedStory.title}
            </h2>
            <p
              style={{
                color: "#6366f1",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              {selectedStory.genre}
            </p>
            <p
              style={{
                color: "#666",
                fontStyle: "italic",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              Prompt: "{selectedStory.prompt}"
            </p>
            <div
              style={{
                lineHeight: "1.8",
                color: "#333",
                fontSize: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedStory.storyText}
            </div>
            {selectedStory.audioFileUrl && (
              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <h3 style={{ marginBottom: "10px", color: "#1a1a1a" }}>
                  🎧 Audio Narration
                </h3>
                <audio
                  controls
                  src={selectedStory.audioFileUrl}
                  style={{ width: "100%" }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>

            <div className="certificate-display">
              <div className="certificate-image-container">
                <img
                  src={badgeImages[selectedCertificate.id]}
                  alt={selectedCertificate.title}
                  className="certificate-image"
                />
              </div>
              <div>
                <h2 className="certificate-title">
                  {selectedCertificate.title}
                </h2>
                <p className="certificate-desc">
                  {selectedCertificate.description}
                </p>
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
    </div>
  );
}

export default DemoPage;

