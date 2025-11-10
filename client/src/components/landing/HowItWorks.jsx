import "./landing.css";

const steps = [
  {
    id: 1,
    emoji: "🎭",
    title: "Choose a Genre",
    description: "Pick a theme for your adventure."
  },
  {
    id: 2,
    emoji: "💡",
    title: "Enter Your Idea",
    description: "Describe your character or plot."
  },
  {
    id: 3,
    emoji: "📖",
    title: "Watch Your Story Appear",
    description: "Our AI brings your imagination to life."
  },
  {
    id: 4,
    emoji: "🏆",
    title: "Earn Certificates & Grow",
    description: "Celebrate your creative milestones."
  }
];

export default function HowItWorks() {
  return (
    <div className="landing-steps">
      <h2 className="landing-steps__title">
        How It Works
      </h2>
      <div className="landing-steps__grid">
        {steps.map((step) => (
          <div key={step.id} className="landing-steps__item">
            <div className="landing-steps__emoji">{step.emoji}</div>
            <h3 className="landing-steps__item-title">
              {step.title}
            </h3>
            <p className="landing-steps__item-description">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

