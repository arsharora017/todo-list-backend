import fastify from "fastify";
import dbPlugin from "./plugins/db.js";
import { todosRoutes } from "./routes/todos.js";

const server = fastify({
  logger: true,
});

await server.register(dbPlugin);
await server.register(todosRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
