import { supabaseClient }
from "../../services/supabase/client";

import { generateEmbedding }
from "./generate-embedding";

export async function indexTouristSpot(
  touristSpot: any
) {

  const content = `

Nome:
${touristSpot.name}

Descrição:
${touristSpot.description}

Cidade:
${touristSpot.city}

Categoria:
${touristSpot.category}

Localização:
${touristSpot.location}

Horário:
${touristSpot.hours}

Avaliação:
${touristSpot.rating}

Selo Vale:
${touristSpot.selo_vale}

`;

  const embedding =
    await generateEmbedding(content);

  // evita duplicação
  const { data: existing } =
    await supabaseClient
      .from("tourist_spot_embeddings")
      .select("id")
      .eq(
        "tourist_spot_id",
        touristSpot.id
      )
      .maybeSingle();

  if (existing) {

    console.log(
      `Embedding já existe:
      ${touristSpot.name}`
    );

    return;
  }

  const { error } =
    await supabaseClient
      .from("tourist_spot_embeddings")
      .insert({

        tourist_spot_id:
          touristSpot.id,

        content,

        metadata: {

          id:
            touristSpot.id,

          name:
            touristSpot.name,

          city:
            touristSpot.city,

          category:
            touristSpot.category,

          rating:
            touristSpot.rating,

          selo_vale:
            touristSpot.selo_vale,

          latitude:
            touristSpot.latitude,

          longitude:
            touristSpot.longitude

        },

        embedding

      });

  if (error) {
    console.error(error);
    throw error;
  }

  console.log(
    `Embedding criado:
    ${touristSpot.name}`
  );

}