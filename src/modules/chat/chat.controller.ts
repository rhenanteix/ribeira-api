import { FastifyReply, FastifyRequest } from "fastify";
import { openaiClient } from "../../services/openai/client";

export async function chatController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const body = request.body as {
    message: string;
  };

  const completion =
    await openaiClient.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Você é a IA da Ribeira Connect.
Nunca invente eventos.
Responda de forma objetiva.
          `
        },
        {
          role: "user",
          content: body.message
        }
      ]
    });

  return reply.send({
    response:
      completion.choices[0].message.content
  });
}