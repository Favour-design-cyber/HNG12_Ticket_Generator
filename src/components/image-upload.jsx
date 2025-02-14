import React, { useState } from "react";
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export default function ImageUpload() {
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const imageUrl = await uploadImageToCloudinary(file);
      
      if (!imageUrl) {
        throw new Error('Failed to get upload URL');
      }

      setUploadedUrl(imageUrl);
      
    } catch (err) {
      setError(err.message || 'Image upload failed. Please try again.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
          <label className="cursor-pointer block">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <div className="space-y-2">
              {(preview || uploadedUrl) ? (
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={uploadedUrl || preview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Upload className="h-10 w-10 text-gray-400" />
                </div>
              )}
              <div className="text-sm text-gray-500">
                {uploading ? 'Uploading...' : 'Click to upload image'}
              </div>
            </div>
          </label>
        </div>

        {uploadedUrl && (
          <div className="text-sm text-green-600 dark:text-green-400 break-all">
            ✅ Uploaded successfully! URL: {uploadedUrl}
          </div>
        )}
      </div>
    </div>
  );
}