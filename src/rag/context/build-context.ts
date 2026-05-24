interface BuildContextInput {
  touristSpots?: any[];
}

export function buildContext({
  touristSpots = []
}: BuildContextInput) {

  let context = "";

  if (touristSpots.length) {

    context += `
PONTOS TURÍSTICOS:

`;

    for (const spot of touristSpots) {

      context += `
Nome:
${spot.metadata?.name || ""}

Conteúdo:
${spot.content}

Similaridade:
${spot.similarity}

`;
    }

  }

  return context;
}