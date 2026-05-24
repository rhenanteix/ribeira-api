import {
  FastifyReply,
  FastifyRequest
} from "fastify";

import {
  ChatInput
} from "./chat.schema";

import {
  chatOrchestrator
} from "../../rag/orchestrator/chat.orchestrator";

export async function chatController(
  request: FastifyRequest<{
    Body: ChatInput;
  }>,
  reply: FastifyReply
) {

  const { message } = request.body;

  const result =
    await chatOrchestrator(message);

  return reply.send(result);

}