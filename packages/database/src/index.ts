export { PrismaClient, Prisma } from "../generated/prisma/index.js";
export type { User, Todo, Priority } from "../generated/prisma/index.js";

// Export database connection utilities
export { prisma, connectDatabase, disconnectDatabase } from "./client.js";

// Export all types
export type * from "../generated/prisma/index.js";
