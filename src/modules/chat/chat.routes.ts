import { FastifyInstance }
from "fastify";

import { chatController }
from "./chat.controller";

export async function chatRoutes(
  app: FastifyInstance
) {

  app.post(
    "/chat",
    chatController
  );

}