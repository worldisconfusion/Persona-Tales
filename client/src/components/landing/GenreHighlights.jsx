import "./landing.css";

const genres = [
  { id: 1, name: "Adventure & Exploration", icon: "explore" },
  { id: 2, name: "Environment & Nature Care", icon: "forest" },
  { id: 3, name: "Gratitude & Humility", icon: "volunteer_activism" },
  { id: 4, name: "Science Fiction", icon: "rocket_launch" },
  { id: 5, name: "Hard Work & Perseverance", icon: "fitness_center" },
  { id: 6, name: "Honesty & Truthfulness", icon: "gavel" },
  { id: 7, name: "Humor / Funny Stories", icon: "mood" },
  { id: 8, name: "Mystery & Problem Solving", icon: "psychology" },
  { id: 9, name: "Mythology", icon: "auto_awesome" },
  { id: 10, name: "Respect for Parents / Elders", icon: "elderly" },
];

export default function GenreHighlights({ selectedGenre, onGenreSelect }) {
  return (
    <div className="landing-genres">
      <h2 className="landing-genres__title">Choose Your Genre 🎨</h2>
      <div className="landing-genres__grid">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`landing-genres__item ${
              selectedGenre === genre.name
                ? "landing-genres__item--selected"
                : ""
            }`}
            onClick={() => onGenreSelect(genre.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="landing-genres__icon">
              <span className="material-symbols-outlined">{genre.icon}</span>
            </div>
            <div>
              <p className="landing-genres__name">{genre.name}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .landing-genres__item--selected {
          background: linear-gradient(
            135deg,
              #f1e3a 0%,
            #fffffe  100%
          ) !important;
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4) !important;
        }

        .landing-genres__item {
          transition: all 0.3s ease;
        }

        .landing-genres__item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .landing-genres__item--selected:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
