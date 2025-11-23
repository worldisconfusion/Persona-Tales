const Story = require("../models/Story");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

// Helper function to generate title from story text
const generateTitle = (storyText) => {
  // Take first 50 characters and add ellipsis if longer
  const title = storyText.substring(0, 50).trim();
  return title + (storyText.length > 50 ? "..." : "");
};

// Save generated story to database
exports.saveStory = async (userId, genre, prompt, storyText) => {
  try {
    // Generate title from story text
    const title = generateTitle(storyText);

    // Create new story document
    const story = await Story.create({
      userId,
      title,
      storyText,
      genre,
      prompt,
    });

    return story;
  } catch (error) {
    console.error("Error saving story:", error);
    throw error;
  }
};

// Update story with audio file URL
exports.updateStoryWithAudio = async (storyId, audioFile, language) => {
  try {
    // Upload audio file to Cloudinary
    const uploadedFile = await uploadFileToCloudinary(
      audioFile,
      process.env.CLOUDINARY_FOLDER_NAME || "persona-tales"
    );

    // Update story with audio URL
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      {
        audioFileUrl: uploadedFile.secure_url,
        audioLanguage: language,
      },
      { new: true }
    );

    return updatedStory;
  } catch (error) {
    console.error("Error updating story with audio:", error);
    throw error;
  }
};

// Get all stories for a specific user
exports.getUserStories = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all stories for the user, sorted by creation date (newest first)
    const stories = await Story.find({ userId })
      .sort({ createdAt: -1 })
      .select("title genre storyText audioFileUrl audioLanguage createdAt");

    return res.status(200).json({
      success: true,
      message: "Stories fetched successfully",
      stories,
    });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
      error: error.message,
    });
  }
};

// Get a specific story by ID
exports.getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.user.id;

    // Fetch story and verify it belongs to the user
    const story = await Story.findOne({ _id: storyId, userId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found or you don't have permission to access it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Story fetched successfully",
      story,
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch story",
      error: error.message,
    });
  }
};
