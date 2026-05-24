import { searchTouristSpots }
from "../rag/retrievers/tourist-spots.semantic";

async function execute() {

  const results =
    await searchTouristSpots(
      "Lugar tranquilo na natureza"
    );

  console.log(
    JSON.stringify(
      results,
      null,
      2
    )
  );

}

execute();