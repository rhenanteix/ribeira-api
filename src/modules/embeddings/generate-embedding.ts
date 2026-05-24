import { openaiClient }
from "../../services/openai/client";

export async function generateEmbedding(
  text: string
) {

  const response =
    await openaiClient.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });

  return response.data[0].embedding;

}