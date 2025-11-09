const genres = [
  { id: 1, name: "Adventure & Exploration", count: 12, color: "#F7B500" },
  { id: 2, name: "Environment & Nature Care", count: 8, color: "#5DBB63" },
  { id: 3, name: "Mystery / Problem-Solving", count: 9, color: "#805AD5" },
  { id: 4, name: "Humor / Funny", count: 11, color: "#F8961E" },
  { id: 5, name: "Respect for Parents / Elders", count: 5, color: "#4C6EF5" },
  { id: 6, name: "Science Fiction", count: 10, color: "#7E53FF" },
];

const totalStories = genres.reduce((sum, genre) => sum + genre.count, 0);

function StoryStatistics() {
  return (
    <section className="card stats">
      <header className="card__heading">
        <h3>Story Statistics</h3>
        <span className="stats__total">{totalStories}</span>
      </header>
      <div className="stats__list">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="stats__item"
            style={{ borderColor: `${genre.color}30` }}
          >
            <div
              className="stats__icon"
              style={{ backgroundColor: `${genre.color}15` }}
            >
              <span style={{ color: genre.color }}>{genre.name.charAt(0)}</span>
            </div>
            <div>
              <p className="stats__name">{genre.name}</p>
              <p className="stats__count">{genre.count} stories</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoryStatistics;
