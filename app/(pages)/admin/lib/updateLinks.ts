import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Function to update links in the user's profile
export async function updateLinks(linksData: any, userID: any, date: any) {
  // Create a Supabase client
  const supabase = createClientComponentClient();
  console.log(date);
  try {
    // Make API request to upsert (insert or update) data in the "profiles" table
    const { error } = await supabase.from("profiles").upsert({
      id: userID, // Specify the user ID
      links: linksData, // Set the links data in the profile
      updated_at: date, // Update the timestamp for last modification
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
