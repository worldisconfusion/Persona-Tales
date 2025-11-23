import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateStory } from "../../services/operations/storyAPI";
import "./landing.css";

export default function PromptInputSection({
  selectedGenre,
  onStoryGenerated,
}) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleGenerate = async () => {
    if (!token) {
      // If not logged in, redirect to signup
      navigate("/signup");
      return;
    }

    if (!selectedGenre || !prompt.trim()) {
      alert("Please select a genre below and enter your story idea");
      return;
    }

    setIsLoading(true);
    const result = await generateStory(selectedGenre, prompt, token);
    setIsLoading(false);

    if (result && onStoryGenerated) {
      onStoryGenerated(result);
      // Clear prompt after generation
      setPrompt("");
    }
  };

  return (
    <div className="landing-prompt">
      <div className="landing-prompt__container">
        {/* Prompt Input */}
        <label className="landing-prompt__input-wrapper">
          <div className="landing-prompt__input-container">
            <input
              className="landing-prompt__input"
              placeholder="Type your story idea or character..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </label>

        {/* Generate Button */}
        <button
          className="landing-prompt__button"
          onClick={handleGenerate}
          disabled={isLoading || !selectedGenre || !prompt.trim()}
        >
          {isLoading ? (
            <span>
              <span className="landing-prompt__spinner"></span>
              Generating Story...
            </span>
          ) : (
            <span>Generate My Story ✨</span>
          )}
        </button>
      </div>

      <style jsx>{`
        .landing-prompt__button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .landing-prompt__spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
