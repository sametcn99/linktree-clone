import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function updateLinks(linksData: any, userID: any) {
  const supabase = createClientComponentClient();
  try {
    // Make API request
    const { error } = await supabase.from("profiles").upsert({
      id: userID,
      links: linksData,
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
