import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { STORY_API } from "../../utils/constants";

// Generate Story API
export const generateStory = async (genre, summary, token) => {
  const toastId = toast.loading("Generating your story...");
  let result = null;

  try {
    const response = await apiConnector({
      method: "POST",
      url: STORY_API.GENERATE_STORY,
      bodyData: { genre, summary },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Story generated successfully!");
    result = {
      story: response.data.story,
      storyId: response.data.storyId,
    };
  } catch (error) {
    console.error("GENERATE_STORY_API ERROR:", error);
    toast.error(
      error?.data?.message || "Failed to generate story. Please try again."
    );
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// Clone Voice API
export const cloneVoice = async (
  text,
  voiceFile,
  language = "en",
  token,
  storyId = null
) => {
  const toastId = toast.loading("Generating cloned voice audio...");
  let result = null;

  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("text", text);
    formData.append("voice_file", voiceFile);
    formData.append("language", language);
    if (storyId) {
      formData.append("storyId", storyId);
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:4000/api/v1"
      }${STORY_API.CLONE_VOICE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clone voice");
    }

    // Get the audio file as blob
    const audioBlob = await response.blob();
    result = audioBlob;

    toast.success("Voice cloned successfully!");
  } catch (error) {
    console.error("CLONE_VOICE_API ERROR:", error);
    toast.error(error.message || "Failed to clone voice. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// Get User Stories API
export const getUserStories = async (token) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: STORY_API.GET_USER_STORIES,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.stories;
  } catch (error) {
    console.error("GET_USER_STORIES_API ERROR:", error);
    return [];
  }
};

// Get Story By ID API
export const getStoryById = async (storyId, token) => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: `${STORY_API.GET_STORY_BY_ID}/${storyId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.story;
  } catch (error) {
    console.error("GET_STORY_BY_ID_API ERROR:", error);
    return null;
  }
};

// Check Story API Health
export const checkStoryAPIHealth = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: STORY_API.STORY_API_HEALTH,
    });
    return response.data.success;
  } catch (error) {
    console.error("STORY_API_HEALTH_CHECK ERROR:", error);
    return false;
  }
};

// Check TTS API Health
export const checkTTSAPIHealth = async () => {
  try {
    const response = await apiConnector({
      method: "GET",
      url: STORY_API.TTS_API_HEALTH,
    });
    return response.data.success;
  } catch (error) {
    console.error("TTS_API_HEALTH_CHECK ERROR:", error);
    return false;
  }
};
