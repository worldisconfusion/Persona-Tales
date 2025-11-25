import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { cloneVoice } from "../services/operations/storyAPI";
import "../index.css";

export default function AudioCloneSection({ storyText, storyId }) {
  const [voiceFile, setVoiceFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState(null);
  const [language, setLanguage] = useState("en");
  const fileInputRef = useRef(null);
  const { token } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.name.match(/\.(wav|mp3|flac)$/i)) {
        alert("Please upload a WAV, MP3, or FLAC file");
        return;
      }
      setVoiceFile(file);
    }
  };

  const handleGenerateAudio = async () => {
    if (!voiceFile) {
      alert("Please upload a voice sample file");
      return;
    }

    if (!storyText) {
      alert("No story text available. Please generate a story first.");
      return;
    }

    setIsLoading(true);
    const audioBlob = await cloneVoice(
      storyText,
      voiceFile,
      language,
      token,
      storyId
    );
    setIsLoading(false);

    if (audioBlob) {
      // Create URL for the audio blob
      const url = URL.createObjectURL(audioBlob);
      setGeneratedAudioUrl(url);
    }
  };

  const downloadAudio = () => {
    if (generatedAudioUrl) {
      const a = document.createElement("a");
      a.href = generatedAudioUrl;
      a.download = "cloned_voice.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetUpload = () => {
    setVoiceFile(null);
    setGeneratedAudioUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="audio-clone">
      <div className="audio-clone__header">
        <h2 className="audio-clone__title">Generate Clone Audio 🎤</h2>
        <p className="audio-clone__description">
          Upload a voice sample (4 -5 minutes) to clone the voice and narrate
          your story
        </p>
      </div>

      <div className="audio-clone__content">
        <div className="audio-clone__upload">
          <label htmlFor="voice-file" className="audio-clone__label">
            Voice Sample File
          </label>
          <div className="audio-clone__file-input-wrapper">
            <input
              ref={fileInputRef}
              id="voice-file"
              type="file"
              accept=".wav,.mp3,.flac"
              onChange={handleFileChange}
              className="audio-clone__file-input"
              disabled={isLoading}
            />
            <button
              className="audio-clone__file-button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {voiceFile ? "✓ Change File" : "📁 Choose File"}
            </button>
            {voiceFile && (
              <span className="audio-clone__file-name">{voiceFile.name}</span>
            )}
          </div>
        </div>

        <div className="audio-clone__language">
          <label htmlFor="language" className="audio-clone__label">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="audio-clone__select"
            disabled={isLoading}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="ru">Russian</option>
            <option value="nl">Dutch</option>
            <option value="cs">Czech</option>
            <option value="ar">Arabic</option>
            <option value="zh-cn">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>

        <div className="audio-clone__actions">
          <button
            className="audio-clone__button audio-clone__button--primary"
            onClick={handleGenerateAudio}
            disabled={isLoading || !voiceFile || !storyText}
          >
            {isLoading ? (
              <>
                <span className="audio-clone__spinner"></span>
                Generating Audio (this may take 4 -5 minutes)...
              </>
            ) : (
              "Generate Audio"
            )}
          </button>

          {voiceFile && (
            <button
              className="audio-clone__button audio-clone__button--secondary"
              onClick={resetUpload}
              disabled={isLoading}
            >
              Reset
            </button>
          )}
        </div>

        {generatedAudioUrl && (
          <div className="audio-clone__result">
            <h3 className="audio-clone__result-title">Generated Audio ✅</h3>
            <audio
              controls
              src={generatedAudioUrl}
              className="audio-clone__player"
            >
              Your browser does not support the audio element.
            </audio>
            <button
              className="audio-clone__button audio-clone__button--download"
              onClick={downloadAudio}
            >
              ⬇ Download Audio
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .audio-clone {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .audio-clone__header {
          margin-bottom: 24px;
        }

        .audio-clone__title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .audio-clone__description {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .audio-clone__content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .audio-clone__upload,
        .audio-clone__language {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .audio-clone__label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .audio-clone__file-input {
          display: none;
        }

        .audio-clone__file-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .audio-clone__file-button {
          background: #f3f4f6;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .audio-clone__file-button:hover:not(:disabled) {
          background: #e5e7eb;
          border-color: #6366f1;
        }

        .audio-clone__file-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .audio-clone__file-name {
          font-size: 14px;
          color: #6366f1;
          font-weight: 500;
        }

        .audio-clone__select {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .audio-clone__select:focus {
          outline: none;
          border-color: #6366f1;
        }

        .audio-clone__select:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .audio-clone__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .audio-clone__button {
          border: none;
          border-radius: 8px;
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .audio-clone__button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .audio-clone__button--primary {
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          color: white;
          flex: 1;
        }

        .audio-clone__button--primary:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .audio-clone__button--secondary {
          background: #f3f4f6;
          color: #4b5563;
        }

        .audio-clone__button--secondary:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .audio-clone__button--download {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .audio-clone__button--download:hover {
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .audio-clone__button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .audio-clone__spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .audio-clone__result {
          background: #f0fdf4;
          border: 2px solid #86efac;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .audio-clone__result-title {
          font-size: 18px;
          font-weight: 600;
          color: #166534;
          margin: 0;
        }

        .audio-clone__player {
          width: 100%;
          border-radius: 8px;
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
