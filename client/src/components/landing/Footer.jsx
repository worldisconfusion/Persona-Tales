import "./landing.css";

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__container">
        <div className="landing-footer__content">
          <div className="landing-footer__brand">
            <div className="landing-footer__brand-icon">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h2 className="landing-footer__brand-text">My Story World</h2>
          </div>
          <div className="landing-footer__links">
            <a 
              className="landing-footer__link" 
              href="#"
            >
              About
            </a>
            <a 
              className="landing-footer__link" 
              href="#"
            >
              FAQ
            </a>
            <a 
              className="landing-footer__link" 
              href="#"
            >
              Contact
            </a>
          </div>
          <p className="landing-footer__copyright">
            © 2024 My Story World. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

