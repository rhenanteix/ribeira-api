import Fastify from "fastify";

const app = Fastify({
    logger: true
})

app.get("/", async () => {
    return { ok: true, service: "Ribeira API" }
})


app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server running on ${address}`) 
})