import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getUserData = async () => {
  // use the cookies from the request
  const cookieStore = cookies();
  // create a supabase client
  const supabase = createClient(cookieStore);
  // get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  try {
    // Fetch the user's profile data
    const { data, error, status } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();

    // If there was an error with the request
    if (error && status !== 406) {
      // Throw the error
      throw error;
    }

    // If the data exists
    if (data) {
      return data;
    }
  } catch (error) {
    // If there was an error, alert the user
    console.log("user not found:\n", error);
    return null;
  }
};
