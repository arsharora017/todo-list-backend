import fp from "fastify-plugin";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import "dotenv/config";

export default fp(async (fastify) => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  fastify.decorate("db", db);
});
