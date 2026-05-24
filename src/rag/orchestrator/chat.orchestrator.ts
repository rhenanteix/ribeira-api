import { detectIntent }
from "./intent-detector";

import { retrieveEvents }
from "../retrievers/events.retriever";

import { retrievePlaces }
from "../retrievers/places.retriever";

import { buildContext }
from "../context/build-context";

import { mainPrompt }
from "../prompts/main.prompt";

import { openaiClient }
from "../../services/openai/client";

export async function chatOrchestrator(
  message: string
) {

  const intent =
    await detectIntent(message);

  const events =
    await retrieveEvents({
      city: intent.city
    });

  const places =
    await retrievePlaces(
      intent.city
    );

  const context =
    buildContext({
      events,
      places
    });

  const completion =
    await openaiClient.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: mainPrompt(context)
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
      intent,
      totalEvents:
        events.length,
      totalPlaces:
        places.length
    }
  };

}