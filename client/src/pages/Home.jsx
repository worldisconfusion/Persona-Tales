import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return <Dashboard />;
}

