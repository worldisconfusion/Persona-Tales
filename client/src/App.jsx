import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DemoPage from "./pages/DemoPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/common/Navbar";
import LandingNavbar from "./components/landing/LandingNavbar";
import OpenRoute from "./components/common/OpenRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import { setToken } from "./slices/authSlice";
import { setUser } from "./slices/profileSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      dispatch(setToken(JSON.parse(storedToken)));
    }
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }

    // If user tries to access login/signup while already authenticated and refresh happens
    if (
      storedToken &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  // Show LandingNavbar only on landing page and demo page routes
  const showLandingNavbar =
    location.pathname === "/" || location.pathname === "/demo";

  return (
    <div className="app">
      {showLandingNavbar ? <LandingNavbar /> : <Navbar />}
      <main className="app__content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
