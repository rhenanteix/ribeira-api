import { supabaseClient } from "../../services/supabase/client";

export async function eventsRetriever(
  city: string
) {
  const { data } = await supabaseClient
    .from("events")
    .select("*")
    .like("city", city)
    .limit(5);

  if (!data) {
    return [];
  }

  return data;
}