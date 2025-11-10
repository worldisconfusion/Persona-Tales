import "./landing.css";

const genres = [
  { id: 1, name: "Adventure", icon: "explore" },
  { id: 2, name: "Nature Care", icon: "park" },
  { id: 3, name: "Mythology", icon: "fort" },
  { id: 4, name: "Gratitude", icon: "favorite" },
  { id: 5, name: "Perseverance", icon: "flag" },
  { id: 6, name: "Honesty", icon: "balance" },
  { id: 7, name: "Humor", icon: "sentiment_very_satisfied" },
  { id: 8, name: "Mystery", icon: "search" },
  { id: 9, name: "Respect", icon: "escalator_warning" },
  { id: 10, name: "Science Fiction", icon: "rocket_launch" }
];

export default function GenreHighlights() {
  return (
    <div className="landing-genres">
      <h2 className="landing-genres__title">
        Choose Your Adventure 🎨
      </h2>
      <div className="landing-genres__grid">
        {genres.map((genre) => (
          <div 
            key={genre.id}
            className="landing-genres__item"
          >
            <div className="landing-genres__icon">
              <span className="material-symbols-outlined">{genre.icon}</span>
            </div>
            <div>
              <p className="landing-genres__name">
                {genre.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

