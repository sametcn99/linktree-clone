import { createClient } from "@/utils/supabase/client";

export default async function getUserSlug({ paramsUsername }: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", paramsUsername);

  if (error) {
    console.error(error);
  } else {
    return data[0];
  }
}
