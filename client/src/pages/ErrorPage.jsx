import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="error">
      <div className="error__content">
        <span className="error__badge">404</span>
        <h1>Lost in the storyverse?</h1>
        <p>
          The page you&apos;re searching for has wandered off into another
          chapter. Let&apos;s get you back home.
        </p>
        <Link to="/" className="error__cta">
          Return to Dashboard
        </Link>
      </div>
    </section>
  );
}

