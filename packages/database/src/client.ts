import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");
    return prisma;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export { prisma };
export default prisma;
