import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserStories } from "../services/operations/storyAPI";

// Map genre names to display names and colors
const genreDisplayConfig = {
  Adventure: {
    displayName: "Adventure & Exploration",
    color: "#F7B500",
    initial: "A",
  },
  Fantasy: { displayName: "Fantasy", color: "#805AD5", initial: "F" },
  Mystery: {
    displayName: "Mystery / Problem-Solving",
    color: "#805AD5",
    initial: "M",
  },
  Romance: { displayName: "Romance", color: "#F06595", initial: "R" },
  Horror: { displayName: "Horror", color: "#E03131", initial: "H" },
  "Science Fiction": {
    displayName: "Science Fiction",
    color: "#7E53FF",
    initial: "S",
  },
  "Historical Fiction": {
    displayName: "Historical Fiction",
    color: "#4C6EF5",
    initial: "H",
  },
  Thriller: { displayName: "Thriller", color: "#C92A2A", initial: "T" },
  Comedy: { displayName: "Comedy / Humor", color: "#F8961E", initial: "C" },
  Drama: { displayName: "Drama", color: "#5DBB63", initial: "D" },
};

function StoryStatistics() {
  const [genreStats, setGenreStats] = useState([]);
  const [totalStories, setTotalStories] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAndCalculateStats = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const userStories = await getUserStories(token);
      setTotalStories(userStories.length);

      // Count stories by genre
      const genreCounts = {};
      userStories.forEach((story) => {
        const genre = story.genre;
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });

      // Convert to array and filter out genres with 0 count
      const statsArray = Object.entries(genreCounts)
        .map(([genre, count]) => ({
          genre,
          count,
          displayName: genreDisplayConfig[genre]?.displayName || genre,
          color: genreDisplayConfig[genre]?.color || "#666",
          initial:
            genreDisplayConfig[genre]?.initial || genre.charAt(0).toUpperCase(),
        }))
        .filter((stat) => stat.count > 0)
        .sort((a, b) => b.count - a.count); // Sort by count descending

      setGenreStats(statsArray);
      setLoading(false);
    };

    fetchAndCalculateStats();
  }, [token]);

  if (loading) {
    return (
      <section className="card stats">
        <header className="card__heading">
          <h3>Story Statistics</h3>
          <span className="stats__total">0</span>
        </header>
        <div className="stats__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Loading statistics...
          </p>
        </div>
      </section>
    );
  }

  if (genreStats.length === 0) {
    return (
      <section className="card stats">
        <header className="card__heading">
          <h3>Story Statistics</h3>
          <span className="stats__total">0</span>
        </header>
        <div className="stats__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No stories yet. Generate stories to see statistics!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="card stats">
      <header className="card__heading">
        <h3>Story Statistics</h3>
        <span className="stats__total">{totalStories}</span>
      </header>
      <div className="stats__list">
        {genreStats.map((stat, index) => (
          <div
            key={index}
            className="stats__item"
            style={{ borderColor: `${stat.color}30` }}
          >
            <div
              className="stats__icon"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <span style={{ color: stat.color }}>{stat.initial}</span>
            </div>
            <div>
              <p className="stats__name">{stat.displayName}</p>
              <p className="stats__count">
                {stat.count} {stat.count === 1 ? "story" : "stories"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoryStatistics;
