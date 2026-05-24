import { supabaseClient } from "../../services/supabase/client";

export async function retrievePlaces(city?: string) {

  let query = supabaseClient
    .from("places")
    .select("*")
    .limit(10);

  if (city) {
    query = query.ilike(
      "city",
      `%${city}%`
    );
  }

  const { data, error } =
    await query;

  if (error) {
    throw error;
  }

  return data || [];
}