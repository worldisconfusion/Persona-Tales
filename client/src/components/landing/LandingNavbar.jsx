import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ProfileDropdown from "../core/ProfileDropdown";
import "./landing.css";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <header className="landing-navbar">
      <div className="landing-navbar__container">
        <div className="landing-navbar__content">
          <div className="landing-navbar__brand" onClick={() => navigate("/")}>
            <div className="landing-navbar__brand-icon">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h2 className="landing-navbar__brand-title">Persona Tales</h2>
          </div>

          <div className="landing-navbar__links-wrapper">
            <div className="landing-navbar__links">
              <a className="landing-navbar__link" onClick={() => navigate("/")}>
                Home
              </a>
              <a className="landing-navbar__link" href="#genres">
                Genres
              </a>
              <a
                className="landing-navbar__link"
                onClick={() => navigate("/demo")}
              >
                Demo
              </a>
            </div>
            <div className="landing-navbar__actions">
              {!token ? (
                <>
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
                </>
              ) : (
                <>
                  <span className="landing-navbar__welcome">
                    {user ? `Hi, ${user.firstName}` : "Welcome"}
                  </span>
                  <ProfileDropdown onLogout={handleLogout} />
                </>
              )}
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
