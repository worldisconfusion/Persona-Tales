const cloudinary = require("cloudinary").v2;

// Upload file to Cloudinary
exports.uploadFileToCloudinary = async (file, folder, quality = "auto") => {
  try {
    const options = {
      folder,
      resource_type: "auto",
    };

    // Add quality option for images
    if (quality) {
      options.quality = quality;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};
