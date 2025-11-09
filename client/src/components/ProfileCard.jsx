function ProfileCard({ user, avatarUrl }) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "Guest User";
  const email = user?.email || "No email provided";
  const contact = user?.contactNumber || "Add your contact number";

  return (
    <section className="card profile">
      <div className="profile__info">
        <div className="profile__avatar">
          <img src={avatarUrl} alt={`${fullName} avatar`} />
        </div>
        <div>
          <h2>{fullName}</h2>
          <p>{email}</p>
          <p>{contact}</p>
        </div>
      </div>
      <button className="profile__action" type="button">
        Edit Profile
      </button>
    </section>
  );
}

export default ProfileCard;