const mongoose = require("mongoose");

// Define the Story schema
const storySchema = new mongoose.Schema(
  {
    // User who created the story
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Auto-generated title from first 50 characters
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // The full story text
    storyText: {
      type: String,
      required: true,
    },
    // Genre of the story
    genre: {
      type: String,
      required: true,
    },
    // Original prompt/summary provided by user
    prompt: {
      type: String,
      required: true,
    },
    // Audio file URL (stored in Cloudinary)
    audioFileUrl: {
      type: String,
      default: null,
    },
    // Language used for audio generation
    audioLanguage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Export the Mongoose model
module.exports = mongoose.model("Story", storySchema);
