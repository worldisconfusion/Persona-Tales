import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import ProfileDropdown from "../core/ProfileDropdown";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Stories", path: "/stories", disabled: true },
  { label: "Certificates", path: "/certificates", disabled: true },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link to="/" className="navbar__brand">
          <div className="navbar__brand-icon">
            <span className="navbar__brand-initials">AI</span>
          </div>
          <span className="navbar__brand-text">AI Story Generator</span>
        </Link>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`navbar__link ${
                location.pathname === link.path ? "navbar__link--active" : ""
              } ${link.disabled ? "navbar__link--disabled" : ""}`}
              onClick={() => !link.disabled && navigate(link.path)}
              disabled={link.disabled}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="navbar__actions">
          {!token && (
            <>
              <button
                className="navbar__cta navbar__cta--secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="navbar__cta navbar__cta--primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}

          {token && (
            <>
              <span className="navbar__welcome">
                {user ? `Hi, ${user.firstName}` : "Welcome"}
              </span>
              <ProfileDropdown onLogout={handleLogout} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

