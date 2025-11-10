import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <header className="landing-navbar">
      <div className="landing-navbar__container">
        <div className="landing-navbar__content">
          <div className="landing-navbar__brand" onClick={() => navigate("/")}>
            <div className="landing-navbar__brand-icon">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h2 className="landing-navbar__brand-title">
              My Story World
            </h2>
          </div>
          
          <div className="landing-navbar__links-wrapper">
            <div className="landing-navbar__links">
              <a 
                className="landing-navbar__link" 
                onClick={() => navigate("/")}
              >
                Home
              </a>
              <a 
                className="landing-navbar__link" 
                href="#"
              >
                About
              </a>
              <a 
                className="landing-navbar__link" 
                href="#"
              >
                Genres
              </a>
            </div>
            <div className="landing-navbar__actions">
              <button 
                className="landing-navbar__button landing-navbar__button--login"
                onClick={() => navigate("/login")}
              >
                <span>Login</span>
              </button>
              <button 
                className="landing-navbar__button landing-navbar__button--signup"
                onClick={() => navigate("/signup")}
              >
                <span>Sign Up</span>
              </button>
            </div>
          </div>
          
          <div className="landing-navbar__mobile-menu">
            <span className="material-symbols-outlined">menu</span>
          </div>
        </div>
      </div>
    </header>
  );
}

