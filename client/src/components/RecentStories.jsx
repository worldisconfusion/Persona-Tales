import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserStories, getStoryById } from "../services/operations/storyAPI";
import { toast } from "react-hot-toast";

function RecentStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchStories = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const userStories = await getUserStories(token);
      setStories(userStories);
      setLoading(false);
    };

    fetchStories();
  }, [token]);

  const handleReadStory = async (storyId) => {
    const story = await getStoryById(storyId, token);
    if (story) {
      setSelectedStory(story);
    } else {
      toast.error("Failed to load story");
    }
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <section className="card stories">
        <header className="card__heading">
          <h3>Recent Stories</h3>
        </header>
        <div className="stories__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            Loading your stories...
          </p>
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return (
      <section className="card stories">
        <header className="card__heading">
          <h3>Recent Stories</h3>
        </header>
        <div className="stories__list">
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No stories yet. Generate your first story to see it here!
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="card stories">
        <header className="card__heading">
          <h3>Recent Stories</h3>
        </header>
        <div className="stories__list">
          {stories.map((story) => (
            <div key={story._id} className="stories__item">
              <div>
                <h4>{story.title}</h4>
                <p>{story.genre}</p>
              </div>
              <button
                type="button"
                className="stories__button"
                onClick={() => handleReadStory(story._id)}
              >
                Read Again
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <div
          className="story-modal-overlay"
          onClick={closeStoryModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="story-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "800px",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              onClick={closeStoryModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                padding: "5px 10px",
              }}
            >
              ×
            </button>
            <h2 style={{ marginBottom: "15px", color: "#1a1a1a" }}>
              {selectedStory.title}
            </h2>
            <p
              style={{
                color: "#6366f1",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              {selectedStory.genre}
            </p>
            <div
              style={{
                lineHeight: "1.8",
                color: "#333",
                fontSize: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedStory.storyText}
            </div>
            {selectedStory.audioFileUrl && (
              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <h3 style={{ marginBottom: "10px", color: "#1a1a1a" }}>
                  Audio Narration
                </h3>
                <audio
                  controls
                  src={selectedStory.audioFileUrl}
                  style={{ width: "100%" }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default RecentStories;
