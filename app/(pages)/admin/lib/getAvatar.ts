import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Function to download an image from Supabase Storage
export async function downloadImage(path: string) {
  // Create a Supabase client
  const supabase = createClientComponentClient();

  try {
    // Download image from Storage
    const { data, error } = await supabase.storage
      .from("avatars") // Specify the storage bucket (avatars in this case)
      .download(path); // Download the image specified by the path
    if (error) {
      // If there is an error during download, throw an exception
      throw error;
    }

    // Create URL for the downloaded image
    const url = URL.createObjectURL(data);
    return url; // Return the created URL
  } catch (error) {
    // Handle and log any errors that occur during the process
    console.log("Error downloading image: ", error);
  }
}
