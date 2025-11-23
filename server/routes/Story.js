const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { auth } = require("../middlewares/auth");
const {
  saveStory,
  updateStoryWithAudio,
  getUserStories,
  getStoryById,
} = require("../controllers/Story");

// Configuration for Python services
const STORY_API_URL = process.env.STORY_API_URL || "http://localhost:8000";
const TTS_API_URL = process.env.TTS_API_URL || "http://localhost:8001";

// ********************************************************************************************************
//                                      Story Generation Route
// ********************************************************************************************************

// Route to generate story
router.post("/generate-story", auth, async (req, res) => {
  try {
    const { genre, summary } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!genre || !summary) {
      return res.status(400).json({
        success: false,
        message: "Genre and summary are required",
      });
    }

    console.log("Generating story with:", { genre, summary });

    // Call Python story API
    const response = await axios.post(
      `${STORY_API_URL}/generate-story`,
      {
        genre,
        summary,
      },
      {
        timeout: 0, // No timeout - let it take as long as needed for story generation
      }
    );

    const storyText = response.data.story;

    // Save story to database
    const savedStory = await saveStory(userId, genre, summary, storyText);

    return res.status(200).json({
      success: true,
      message: "Story generated successfully",
      story: storyText,
      storyId: savedStory._id, // Send story ID to frontend
    });
  } catch (error) {
    console.error("Error generating story:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate story",
      error: error.response?.data?.detail || error.message,
    });
  }
});

// ********************************************************************************************************
//                                      TTS Voice Clone Route
// ********************************************************************************************************

// Route to clone voice and generate audio
router.post("/clone-voice", auth, async (req, res) => {
  try {
    const { text, language = "en", storyId } = req.body;
    const voiceFile = req.files?.voice_file;

    // Validate input
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    if (!voiceFile) {
      return res.status(400).json({
        success: false,
        message: "Voice file is required",
      });
    }

    console.log("Cloning voice with text length:", text.length);
    console.log("Voice file details:", {
      name: voiceFile.name,
      size: voiceFile.size,
      mimetype: voiceFile.mimetype,
      tempFilePath: voiceFile.tempFilePath,
    });

    // Prepare form data for TTS API
    const formData = new FormData();
    formData.append("text", text);
    formData.append("language", language);

    // Use the temporary file path to create a read stream
    // This is the correct way when using express-fileupload with useTempFiles
    formData.append("voice_file", fs.createReadStream(voiceFile.tempFilePath), {
      filename: voiceFile.name,
      contentType: voiceFile.mimetype,
    });

    // Call Python TTS API
    const response = await axios.post(`${TTS_API_URL}/clone`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      responseType: "arraybuffer", // Important: receive binary data
      timeout: 0, // No timeout - let it take as long as needed for voice cloning
    });

    // Save audio file to temporary location
    const tempAudioPath = `/tmp/audio_${Date.now()}.wav`;
    fs.writeFileSync(tempAudioPath, Buffer.from(response.data));

    // Create a file object for Cloudinary upload
    const audioFileForUpload = {
      tempFilePath: tempAudioPath,
    };

    // Update story with audio file URL if storyId is provided
    if (storyId) {
      try {
        await updateStoryWithAudio(storyId, audioFileForUpload, language);
        console.log("Story updated with audio URL");
      } catch (updateError) {
        console.error("Error updating story with audio:", updateError.message);
      }
    }

    // Clean up: Remove the temporary files after processing
    try {
      if (fs.existsSync(voiceFile.tempFilePath)) {
        fs.unlinkSync(voiceFile.tempFilePath);
      }
      if (fs.existsSync(tempAudioPath)) {
        fs.unlinkSync(tempAudioPath);
      }
    } catch (cleanupError) {
      console.error("Error cleaning up temp file:", cleanupError.message);
    }

    // Send audio file back to client
    res.set({
      "Content-Type": "audio/wav",
      "Content-Disposition": 'attachment; filename="cloned_voice.wav"',
    });

    return res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Error cloning voice:", error.message);

    // Clean up temp file in case of error
    try {
      const voiceFile = req.files?.voice_file;
      if (voiceFile?.tempFilePath && fs.existsSync(voiceFile.tempFilePath)) {
        fs.unlinkSync(voiceFile.tempFilePath);
      }
    } catch (cleanupError) {
      console.error("Error cleaning up temp file:", cleanupError.message);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to clone voice",
      error: error.response?.data?.detail || error.message,
    });
  }
});

// ********************************************************************************************************
//                                      Get Stories Routes
// ********************************************************************************************************

// Get all stories for logged-in user
router.get("/get-user-stories", auth, getUserStories);

// Get a specific story by ID
router.get("/get-story/:storyId", auth, getStoryById);

// ********************************************************************************************************
//                                      Health Check Routes
// ********************************************************************************************************

// Check if story API is running
router.get("/story-api-health", async (req, res) => {
  try {
    const response = await axios.get(`${STORY_API_URL}/`);
    return res.status(200).json({
      success: true,
      message: "Story API is running",
      data: response.data,
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "Story API is not available",
      error: error.message,
    });
  }
});

// Check if TTS API is running
router.get("/tts-api-health", async (req, res) => {
  try {
    const response = await axios.get(`${TTS_API_URL}/health`);
    return res.status(200).json({
      success: true,
      message: "TTS API is running",
      data: response.data,
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: "TTS API is not available",
      error: error.message,
    });
  }
});

module.exports = router;
