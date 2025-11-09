import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { login } from "../services/operations/authAPI";

const initialFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(formData.email.trim().toLowerCase(), formData.password, navigate));
  };

  return (
    <section className="auth auth--login">
      <div className="auth__card">
        <div className="auth__header">
          <h1>Welcome back, storyteller!</h1>
          <p>Sign in to continue crafting delightful, AI-powered tales.</p>
        </div>

        <form className="auth__form auth__form--single" onSubmit={handleSubmit}>
          <label className="auth__label">
            <span>Email Address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex.johnson@email.com"
              required
            />
          </label>

          <label className="auth__label auth__label--password">
            <span>Password</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="auth__password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </label>

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth__footer">
          New here?{" "}
          <Link to="/signup" className="auth__link">
            Create an account
          </Link>
        </p>
      </div>
      <div className="auth__illustration auth__illustration--login">
        <div className="auth__illustration-card">
          <h3>Your stories await</h3>
          <p>Pick up where you left off and spark new ideas instantly.</p>
        </div>
      </div>
    </section>
  );
}

