import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Function to update user data in the "profiles" table
export async function updateUserData({
  username,
  fullname,
  userID,
  bio,
  avatar_url,
  website,
  updated_at,
}: any) {
  // Create a Supabase client
  const supabase = createClientComponentClient();
  try {
    // Make API request to upsert (insert or update) user data in the "profiles" table
    const { error } = await supabase.from("profiles").upsert({
      id: userID, // Specify the user ID
      updated_at: updated_at, // Update the timestamp for last modification
      username: username, // Set the username in the profile
      full_name: fullname, // Set the full name in the profile
      avatar_url: avatar_url, // Set the avatar URL in the profile
      bio: bio, // Set the bio in the profile
      website,
    });

    // If there is an error during the upsert operation
    if (error) {
      console.error("Supabase upsert error:", error);
      throw error; // Throw the error to handle it further
    }

    // Log and alert that the profile has been updated successfully
    console.log("Profile updated!");
    alert("Profile updated!");
  } catch (error) {
    // Log and alert if there is an error during the process
    console.error("Error updating the data:", error);
    alert("Error updating the data!");
  }
}
