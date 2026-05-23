import { FastifyReply, FastifyRequest } from "fastify";
import { openaiClient } from "../../services/openai/client";
import { eventsRetriever } from "../../rag/retrievers/events.retriever";
import { buildContext } from "../../rag/context/build-context";

export async function chatController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const body = request.body as {
    message: string;
  };

  const events =
    await eventsRetriever(body.message);

  const context =
    buildContext(events);

  const completion =
    await openaiClient.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
           role: "system",
  content: `
Você é a IA da Ribeira Connect.

Contexto:
${context}

Use SOMENTE o contexto acima.
Nunca invente eventos.
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