import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserStories } from "../services/operations/storyAPI";

// Define all possible badges/certificates based on milestones
const allBadges = [
  {
    id: 1,
    title: "Story Beginner",
    description: "For creating your first story.",
    minStories: 1,
    emoji: "🌟",
  },
  {
    id: 2,
    title: "Story Enthusiast",
    description: "For creating 3 or more stories.",
    minStories: 3,
    emoji: "✨",
  },
  {
    id: 3,
    title: "Master Storyteller",
    description: "For creating 5 or more stories.",
    minStories: 5,
    emoji: "🏅",
  },
];

function Certificates() {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAndCalculateBadges = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const userStories = await getUserStories(token);
      const storyCount = userStories.length;

      // Filter badges user has earned based on story count
      const earned = allBadges.filter(
        (badge) => storyCount >= badge.minStories
      );
      setEarnedBadges(earned);
      setLoading(false);
    };

    fetchAndCalculateBadges();
  }, [token]);

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
    <section className="card certificates">
      <header className="card__heading">
        <h3>Certificates Earned</h3>
      </header>
      <div className="certificates__list">
        {earnedBadges.map((certificate) => (
          <div key={certificate.id} className="certificates__item">
            <div className="certificates__badge">
              <span>{certificate.emoji}</span>
            </div>
            <div className="certificates__details">
              <h4>{certificate.title}</h4>
              <p>{certificate.description}</p>
            </div>
            <button type="button" className="certificates__button">
              View Certificate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
