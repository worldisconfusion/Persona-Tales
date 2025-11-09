const recentStories = [
  {
    id: 1,
    title: "The Quest for the Crystal Key",
    category: "Adventure & Exploration",
  },
  {
    id: 2,
    title: "The Guardians of the Green Forest",
    category: "Environment & Nature Care",
  },
  {
    id: 3,
    title: "Mystery at the Midnight Mansion",
    category: "Mystery / Problem-Solving",
  },
];

function RecentStories() {
  return (
    <section className="card stories">
      <header className="card__heading">
        <h3>Recent Stories</h3>
      </header>
      <div className="stories__list">
        {recentStories.map((story) => (
          <div key={story.id} className="stories__item">
            <div>
              <h4>{story.title}</h4>
              <p>{story.category}</p>
            </div>
            <button type="button" className="stories__button">
              Read Again
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentStories;
