import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./landing.css";

export default function PromptInputSection() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleGenerate = () => {
    if (!token) {
      // If not logged in, redirect to signup
      navigate("/signup");
    } else {
      // If logged in, navigate to story generation (to be implemented)
      console.log("Generate story with prompt:", prompt);
      // navigate("/generate", { state: { prompt } });
    }
  };

  return (
    <div className="landing-prompt">
      <div className="landing-prompt__container">
        <label className="landing-prompt__input-wrapper">
          <div className="landing-prompt__input-container">
            <input 
              className="landing-prompt__input" 
              placeholder="Type your story idea or character..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </label>
        <button 
          className="landing-prompt__button"
          onClick={handleGenerate}
        >
          <span>Generate My Story ✨</span>
        </button>
      </div>
    </div>
  );
}

