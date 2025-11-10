import "./landing.css";

const features = [
  {
    id: 1,
    icon: "spark",
    title: "AI Story Creator",
    description: "Turn your ideas into wonderful stories."
  },
  {
    id: 2,
    icon: "school",
    title: "Learn Good Values",
    description: "Stories are built to inspire kindness and growth."
  },
  {
    id: 3,
    icon: "shield_person",
    title: "Safe for Kids",
    description: "Content is carefully filtered and child-friendly."
  },
  {
    id: 4,
    icon: "military_tech",
    title: "Earn Achievements",
    description: "Receive certificates as you grow your storytelling journey."
  }
];

export default function WhatMakesUsSpecial() {
  return (
    <div className="landing-features">
      <h2 className="landing-features__title">
        What Makes Us Special
      </h2>
      <div className="landing-features__grid">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="landing-features__item"
          >
            <div className="landing-features__icon">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="landing-features__item-title">
              {feature.title}
            </h3>
            <p className="landing-features__item-description">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

