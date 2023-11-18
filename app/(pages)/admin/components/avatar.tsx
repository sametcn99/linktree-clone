"use client"; // Assuming this is a special comment, it's kept as is

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

// Props interface for the Avatar component
interface AvatarProps {
  uid: string;
  url?: string;
  size: number;
  onUpload: (filePath: string) => void;
}

// Avatar component
export default function Avatar({ uid, url, size, onUpload }: AvatarProps) {
  // Create a Supabase client
  const supabase = createClientComponentClient();

  // State variables for avatar URL and uploading status
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // Effect to download image if URL is provided
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        // Download image from Storage
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);

        // If there is an error during download, throw an exception
        if (error) {
          throw error;
        }

        // Create URL for the image and set it in the state
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    // If there is a URL for the image, download it
    if (url) downloadImage(url);
  }, [url, supabase]);

  /**
   * Uploads an avatar image to Supabase storage bucket.
   * @param {Event} event - The event triggered by the user selecting an image to upload.
   * @throws {Error} If no image is selected to upload.
   * @throws {Error} If there is an error uploading the image to the storage bucket.
   */
  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);

      // Check if the user has selected any files to upload
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      // Get the selected file
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      // Upload the file to the storage bucket
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      // If there is an error during the upload, throw an exception
      if (uploadError) {
        throw uploadError;
      }

      // Call the onUpload callback with the file path
      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      // Set uploading status to false after completion
      setUploading(false);
    }
  };

  // Render the Avatar component
  return (
    <div className="flex flex-col justify-center items-center text-center">
      {/* Display the avatar image if available */}
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        /* Display a placeholder if avatar image is not available */
        <div
          className="flex justify-center items-center text-center bg-gray-600 rounded-full avatar no-image"
          style={{ height: size, width: size }}
        >
          Avatar Not Found
        </div>
      )}

      {/* Input for uploading a new avatar image */}
      <div style={{ width: size }} className="font-bold">
        <label htmlFor="single">
          {uploading ? "Uploading ..." : "Change Avatar"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
