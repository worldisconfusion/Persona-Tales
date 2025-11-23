import { useState } from "react";
import "../index.css";

export default function GeneratedStoryDisplay({ story, onUseForAudio }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!story) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(story);
    alert("Story copied to clipboard!");
  };

  return (
    <div className="story-display">
      <div className="story-display__header">
        <h2 className="story-display__title">Your Generated Story 📖</h2>
        <button
          className="story-display__toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="story-display__content">
            <p className="story-display__text">{story}</p>
          </div>

          <div className="story-display__actions">
            <button
              className="story-display__button story-display__button--secondary"
              onClick={copyToClipboard}
            >
              📋 Copy Story
            </button>
            <button
              className="story-display__button story-display__button--primary"
              onClick={() => onUseForAudio(story)}
            >
              🎤 Generate Clone Audio
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .story-display {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .story-display__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .story-display__title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .story-display__toggle {
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #4b5563;
          cursor: pointer;
          transition: background 0.2s;
        }

        .story-display__toggle:hover {
          background: #e5e7eb;
        }

        .story-display__content {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 16px;
          max-height: 400px;
          overflow-y: auto;
        }

        .story-display__text {
          font-size: 15px;
          line-height: 1.8;
          color: #374151;
          margin: 0;
          white-space: pre-wrap;
        }

        .story-display__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .story-display__button {
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .story-display__button:hover {
          transform: translateY(-2px);
        }

        .story-display__button--primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .story-display__button--primary:hover {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .story-display__button--secondary {
          background: #f3f4f6;
          color: #4b5563;
        }

        .story-display__button--secondary:hover {
          background: #e5e7eb;
        }

        .story-display__content::-webkit-scrollbar {
          width: 8px;
        }

        .story-display__content::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 4px;
        }

        .story-display__content::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 4px;
        }

        .story-display__content::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}

