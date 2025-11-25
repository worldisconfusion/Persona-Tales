import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

import { signup } from "../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../utils/constants";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
  accountType: ACCOUNT_TYPE.USER,
};

export default function Signup() {
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.contactNumber.trim().length < 10) {
      toast.error("Please enter a valid contact number");
      return;
    }

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      contactNumber: formData.contactNumber.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      accountType: formData.accountType,
    };

    dispatch(signup(payload, navigate));
  };

  return (
    <section className="auth auth--signup">
      <div className="auth__card">
        <div className="auth__header">
          <h1>Create your adventure account</h1>
          <p>Join Persona Tales and craft magical stories in seconds.</p>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__row">
            <label className="auth__label">
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Alex"
                required
              />
            </label>
            <label className="auth__label">
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Johnson"
                required
              />
            </label>
          </div>

          <div className="auth__row">
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
            <label className="auth__label">
              <span>Contact Number</span>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+1 123 456 7890"
                required
              />
            </label>
          </div>

          <div className="auth__row">
            <label className="auth__label auth__label--password">
              <span>Create Password</span>
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

            <label className="auth__label auth__label--password">
              <span>Confirm Password</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="auth__password-toggle"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </label>
          </div>

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth__footer">
          Already have an account?{" "}
          <Link to="/login" className="auth__link">
            Sign in
          </Link>
        </p>
      </div>
      <div className="auth__illustration auth__illustration--signup">
        <div className="auth__illustration-card">
          <h3>Shape your universe</h3>
          <p>Build characters, worlds, and unforgettable stories.</p>
        </div>
      </div>
    </section>
  );
}
