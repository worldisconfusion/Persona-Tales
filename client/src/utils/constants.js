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

export const STORY_API = {
  GENERATE_STORY: "/story/generate-story",
  CLONE_VOICE: "/story/clone-voice",
  STORY_API_HEALTH: "/story/story-api-health",
  TTS_API_HEALTH: "/story/tts-api-health",
  GET_USER_STORIES: "/story/get-user-stories",
  GET_STORY_BY_ID: "/story/get-story",
};

export const GENRES = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror",
  "Adventure",
  "Historical Fiction",
  "Thriller",
  "Comedy",
  "Drama",
];
