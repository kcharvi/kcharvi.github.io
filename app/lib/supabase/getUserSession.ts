// "use server"; // Disabled for static export

import createSupabaseServerClient from "./server";

export default async function getUserSession() {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.getSession();
}
