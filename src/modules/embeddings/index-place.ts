import { supabaseClient }
from "../../services/supabase/client";

import { generateEmbedding }
from "./generate-embedding";

export async function indexPlace(
  place: any
) {

  const content = `
Nome: ${place.name}

Descrição:
${place.description}

Cidade:
${place.city}

Categoria:
${place.category}
`;

  const embedding =
    await generateEmbedding(content);

  await supabaseClient
    .from("place_embeddings")
    .insert({
      place_id: place.id,
      content,
      metadata: {
        city: place.city,
        category: place.category
      },
      embedding
    });

}