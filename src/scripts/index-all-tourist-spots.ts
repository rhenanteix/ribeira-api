import { supabaseClient }
from "../services/supabase/client";

import { indexTouristSpot }
from "../modules/embeddings/index-tourist-spot";

async function execute() {

  console.log(
    "Buscando tourist spots..."
  );

  

  const { data, error } =
    await supabaseClient
      .from("tourist_spots")
      .select("*");

  if (error) {
    throw error;
  }

  console.log(
    `Encontrados ${data.length} registros`
  );

  function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  for (const touristSpot of data) {

    console.log(
      `Indexando:
      ${touristSpot.name}`
    );

    await indexTouristSpot(
      touristSpot
    );

    await sleep(1000);
  }

  console.log(
    "Indexação concluída"
  );

}



execute();