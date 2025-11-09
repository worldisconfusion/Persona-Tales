import { useMemo } from "react";
import { useSelector } from "react-redux";

import Header from "./Header";
import ProfileCard from "./ProfileCard";
import StoryStatistics from "./StoryStatistics";
import Certificates from "./Certificates";
import RecentStories from "./RecentStories";
import MotivationalBanner from "./MotivationalBanner";

function Dashboard() {
  const { user } = useSelector((state) => state.profile);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const avatarUrl = useMemo(() => {
    if (user?.image) return user.image;
    const seed = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    return `https://api.dicebear.com/5.x/initials/svg?seed=${seed || "Story Teller"}`;
  }, [user]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <Header user={user} greeting={greeting} avatarUrl={avatarUrl} />
        <div className="dashboard__grid">
          <div className="dashboard__column">
            <ProfileCard user={user} avatarUrl={avatarUrl} />
            <StoryStatistics />
          </div>
          <div className="dashboard__column dashboard__column--wide">
            <Certificates />
            <RecentStories />
          </div>
        </div>
        <MotivationalBanner />
      </div>
    </div>
  );
}

export default Dashboard;