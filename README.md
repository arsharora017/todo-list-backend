# Todo List Backend

A lightweight and modern REST API backend for managing todos, built with **Fastify** and **Drizzle ORM**.

## 🚀 Tech Stack

- **Framework**: [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript-first SQL ORM
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## 📋 Features

- ✅ Full CRUD operations for todos
- ✅ CORS enabled for frontend integration
- ✅ TypeScript support with strict typing
- ✅ Database migrations with Drizzle Kit
- ✅ Comprehensive logging with Fastify

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm (or npm/yarn)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todo-list-backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
   ```

4. **Run database migrations**
   ```bash
   pnpm exec drizzle-kit push:pg
   ```

## 🏃 Running the Server

### Development

```bash
pnpm run build
pnpm run start
```

The server will start at `http://localhost:8080`

### Build

```bash
pnpm run build
```

Compiles TypeScript to JavaScript in the `dist/` directory.

## 🔌 API Endpoints

### Get All Todos

```
GET /todos
```

Returns all todos sorted by creation date (newest first).

**Response:**

```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": "2024-02-05T10:30:00Z"
  }
]
```

### Create a Todo

```
POST /todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response:** Returns the created todo object with auto-generated `id` and `createdAt`.

### Get a Specific Todo

```
GET /todos/:id
```

**Response:** Returns the todo with the specified ID.

**Status:** `404` if todo not found.

### Update a Todo

```
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response:** Returns the updated todo object.

**Status:** `404` if todo not found.

### Delete a Todo

```
DELETE /todos/:id
```

**Response:** Returns the deleted todo object.

**Status:** `404` if todo not found.

## 📁 Project Structure

```
todo-list-backend/
├── src/
│   ├── index.ts              # Server entry point
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   ├── schema.ts         # Drizzle schema definitions
│   │   └── drizzle/          # Generated migration files
│   ├── plugins/
│   │   ├── db.ts            # Fastify DB plugin
│   │   └── types/
│   │       └── fastify.d.ts  # TypeScript types for Fastify
│   └── routes/
│       └── todos.ts         # Todo routes and handlers
├── drizzle/                  # Migration files and snapshots
├── dist/                     # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── drizzle.config.ts        # Drizzle ORM configuration
└── README.md
```

## 🗄️ Database Schema

### Todos Table

| Column        | Type                    | Description                        |
| ------------- | ----------------------- | ---------------------------------- |
| `id`          | BIGINT (PRIMARY KEY)    | Auto-generated unique ID           |
| `title`       | TEXT (NOT NULL)         | Todo title                         |
| `description` | TEXT (NULLABLE)         | Todo description                   |
| `completed`   | BOOLEAN                 | Completion status (default: false) |
| `createdAt`   | TIMESTAMP WITH TIMEZONE | Creation timestamp                 |

## 🔧 Environment Configuration

### CORS Settings

The server is configured to accept requests from `http://localhost:5173` (default Vite dev server port). Modify the CORS origin in [src/index.ts](src/index.ts) to match your frontend URL:

```typescript
await server.register(cors, {
  origin: "http://your-frontend-url",
  methods: ["GET", "POST", "PUT", "DELETE"],
});
```

## 📝 Available Scripts

- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm run start` - Run the compiled server
- `pnpm run test` - Run tests (not yet implemented)

## 🛠️ Database Migrations

To manage database schema changes with Drizzle Kit:

```bash
# Generate migration files
pnpm exec drizzle-kit generate:pg

# Apply pending migrations
pnpm exec drizzle-kit push:pg

# Drop the database (use with caution)
pnpm exec drizzle-kit drop
```

## 📚 Dependencies

### Core

- `fastify` - Web framework
- `@fastify/cors` - CORS support
- `drizzle-orm` - ORM
- `pg` - PostgreSQL client
- `fastify-plugin` - Plugin system for Fastify
- `dotenv` - Environment variable management

### Development

- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `@types/pg` - PostgreSQL type definitions
- `drizzle-kit` - Drizzle ORM CLI tools
- `ts-node` - TypeScript execution for Node.js

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC
