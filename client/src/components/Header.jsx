function Header({ user, greeting, avatarUrl }) {
  const displayName = user?.firstName || "Creator";
  const altText = `${displayName}'s avatar`;

  return (
    <header className="dashboard__header">
      <div>
        <p className="dashboard__greeting">
          {greeting}, {displayName}!
        </p>
        <p className="dashboard__subtitle">Ready to create a new adventure?</p>
      </div>
      <div className="dashboard__avatar">
        <img src={avatarUrl} alt={altText} />
      </div>
    </header>
  );
}

export default Header;