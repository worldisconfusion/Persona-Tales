const certificates = [
  {
    id: 1,
    title: "Adventure Explorer",
    description: "For creating 10+ Adventure & Exploration stories.",
  },
  {
    id: 2,
    title: "Master Storyteller",
    description: "For creating stories in all 10 different genres.",
  },
];

function Certificates() {
  return (
    <section className="card certificates">
      <header className="card__heading">
        <h3>Certificates Earned</h3>
      </header>
      <div className="certificates__list">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="certificates__item">
            <div className="certificates__badge">
              <span>🏅</span>
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
