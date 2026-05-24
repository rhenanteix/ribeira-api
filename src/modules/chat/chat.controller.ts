import { FastifyReply }
from "fastify";

import { FastifyRequest }
from "fastify";

import { chatOrchestrator }
from "../../rag/orchestrator/chat.orchestrator";

export async function chatController(
  request: FastifyRequest<{
    Body: {
      message: string;
    };
  }>,
  reply: FastifyReply
) {

  const { message } =
    request.body;

  const response =
    await chatOrchestrator(
      message
    );

  return reply.send(response);

}