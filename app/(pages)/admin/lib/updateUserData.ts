import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function updateUserData({ username, fullname, userID }: any) {
  const supabase = createClientComponentClient();
  console.log("Updating profile for user:", userID);
  console.log("Username:", username);
  console.log("Full name:", fullname);
  try {
    // Make API request
    const { error } = await supabase.from("profiles").upsert({
      id: userID,
      username: username,
      full_name: fullname,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase upsert error:", error);
      throw error;
    }
    console.log("Profile updated!");
    alert("Profile updated!");
  } catch (error) {
    console.error("Error updating the data:", error);
    alert("Error updating the data!");
  }
}
