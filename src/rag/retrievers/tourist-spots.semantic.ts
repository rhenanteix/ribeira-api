import { supabaseClient }
from "../../services/supabase/client";

import { generateEmbedding }
from "../../modules/embeddings/generate-embedding";

export async function searchTouristSpots(
  query: string
) {

  const embedding =
    await generateEmbedding(query);

  const { data, error } =
    await supabaseClient.rpc(
      "match_tourist_spots",
      {
        query_embedding:
          embedding,

        match_threshold:
          0.7,

        match_count:
          5
      }
    );

  if (error) {
    throw error;
  }

  return data || [];

}