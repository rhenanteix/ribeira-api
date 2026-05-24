import { openaiClient }
from "../../services/openai/client";

import { searchTouristSpots }
from "../retrievers/tourist-spots.semantic";

import { buildContext }
from "../context/build-context";

import { mainPrompt }
from "../prompts/main.prompt";

export async function chatOrchestrator(
  message: string
) {

  const touristSpots =
    await searchTouristSpots(
      message
    );

  const context =
    buildContext({
      touristSpots
    });

  const completion =
    await openaiClient.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            mainPrompt(context)
        },
        {
          role: "user",
          content: message
        }
      ]
    });

  return {

    response:
      completion.choices[0]
        .message.content,

    metadata: {
      retrievedSpots:
        touristSpots.length
    }

  };

}