import type { FastifyInstance } from "fastify";
import { desc, eq } from "drizzle-orm";
import { todos } from "../db/schema.js";

export async function todosRoutes(fastify: FastifyInstance) {
  // GET /todos
  fastify.get("/todos", async () => {
    return fastify.db.select().from(todos).orderBy(desc(todos.createdAt));
  });

  // POST /todos
  fastify.post("/todos", async (request) => {
    const { title, description } = request.body as {
      title: string;
      description?: string;
    };

    const [todo] = await fastify.db
      .insert(todos)
      .values({
        title,
        description,
        completed: false,
      })
      .returning();

    return todo;
  });

  // GET /todos/:id
  fastify.get("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [todo] = await fastify.db
      .select()
      .from(todos)
      .where(eq(todos.id, Number(id)));

    if (!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }

    return todo;
  });

  // PUT /todos/:id
  fastify.put("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, description, completed } = request.body as {
      title?: string;
      description?: string;
      completed?: boolean;
    };

    const [todo] = await fastify.db
      .update(todos)
      .set({ title, description, completed })
      .where(eq(todos.id, Number(id)))
      .returning();

    if (!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }

    return todo;
  });

  // DELETE /todos/:id
  fastify.delete("/todos/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const [todo] = await fastify.db
      .delete(todos)
      .where(eq(todos.id, Number(id)))
      .returning();

    if (!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }

    return { success: true };
  });
}
