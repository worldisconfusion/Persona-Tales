export const ACCOUNT_TYPE = {
  USER: "User",
  ADMIN: "Admin",
};

export const BASE_URL =
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:4000/api/v1";

export const AUTH_API = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
};

