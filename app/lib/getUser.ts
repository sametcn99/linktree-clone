import { createClient } from "@/utils/supabase/client";

// Function to get user data by username from the "profiles" table
export default async function getUser({ paramsUsername }: any) {
  // Create a Supabase client
  const supabase = createClient();

  // Make API request to fetch user data
  const { data, error } = await supabase
    .from("profiles") // Specify the table (profiles in this case)
    .select("*") // Select all columns
    .eq("username", paramsUsername); // Filter the data by the provided username

  // If there is an error during the request
  if (error) {
    console.error(error);
  } else {
    // If the data exists, return the first item (assuming username is unique)
    return data[0];
  }
}
