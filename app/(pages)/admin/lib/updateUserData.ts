import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Function to update user data in the "profiles" table
export async function updateUserData({
  username,
  fullname,
  userID,
  bio,
  avatar_url,
}: any) {
  // Create a Supabase client
  const supabase = createClientComponentClient();
  console.log("Full name:", avatar_url);

  try {
    // Make API request to upsert (insert or update) user data in the "profiles" table
    const { error } = await supabase.from("profiles").upsert({
      id: userID, // Specify the user ID
      username: username, // Set the username in the profile
      full_name: fullname, // Set the full name in the profile
      updated_at: new Date().toISOString(), // Update the timestamp for last modification
      avatar_url: avatar_url, // Set the avatar URL in the profile
      bio: bio, // Set the bio in the profile
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
