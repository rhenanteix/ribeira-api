import Fastify from "fastify";
import { chatRoutes } from "./modules/chat/chat.routes";

const app = Fastify({
    logger: true
})

app.get("/", async () => {
    return { ok: true, service: "Ribeira API" }
})

app.register(chatRoutes)


app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server running on ${address}`) 
})