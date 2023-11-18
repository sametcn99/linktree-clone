import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Function to get user data from Supabase
export const getUserData = async () => {
  // Use the cookies from the request
  const cookieStore = cookies();
  // Create a Supabase client
  const supabase = createClient(cookieStore);
  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  try {
    // Fetch the user's profile data
    const { data, error, status } = await supabase
      .from("profiles") // Specify the table (profiles in this case)
      .select()
      .eq("id", user?.id) // Filter the profile data by the user's id
      .single();

    // If there was an error with the request
    if (error && status !== 406) {
      // Throw the error
      throw error;
    }

    // If the data exists
    if (data) {
      return data; // Return the user's profile data
    }
  } catch (error) {
    // If there was an error, log and handle it
    console.log("User not found:\n", error);
    return null; // Return null if the user is not found or an error occurs
  }
};
