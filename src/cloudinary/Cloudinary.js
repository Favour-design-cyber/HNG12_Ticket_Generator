export const uploadImageToCloudinary = async (file) => {
    if (!file) {
      console.error("No file provided");
      return null;
    }
  
    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error("Invalid file type. Please upload an image.");
      return null;
    }
  
    // Validate file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      console.error("File size too large. Maximum size is 10MB");
      return null;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dubfbuvjl");
      formData.append("folder", "uploads");
      formData.append("resource_type", "auto");
  
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dubfbuvjl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }
  
      if (data.secure_url) {
        console.log("✅ Image uploaded successfully:", data.secure_url);
        return data.secure_url;
      } else {
        throw new Error('No secure URL received from Cloudinary');
      }
  
    } catch (error) {
      console.error("🔥 Upload Error:", error.message || 'Unknown error');
      throw error;
    }
  };