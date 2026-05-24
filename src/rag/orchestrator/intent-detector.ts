import { openaiClient } from "../../services/openai/client";

export async function detectIntent(message: string) {
  const completion =
    await openaiClient.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: {
        type: "json_object"
      },
      messages: [
        {
          role: "system",
          content: `
Extraia:
- intent
- city
- period
- category

Retorne JSON.
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

  return JSON.parse(
    completion.choices[0].message.content!
  );

}