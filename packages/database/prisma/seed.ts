import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
    },
  });

  // Create sample todos
  const todos = await Promise.all([
    prisma.todo.create({
      data: {
        title: "Setup Prisma ORM",
        description: "Configure Prisma ORM in the Turborepo monorepo",
        completed: true,
        priority: "HIGH",
        userId: user.id,
      },
    }),
    prisma.todo.create({
      data: {
        title: "Create API endpoints",
        description: "Build REST API for todo operations",
        completed: false,
        priority: "MEDIUM",
        dueDate: new Date("2025-11-15"),
        userId: user.id,
      },
    }),
    prisma.todo.create({
      data: {
        title: "Build frontend",
        description: "Create React components for the todo app",
        completed: false,
        priority: "HIGH",
        userId: user.id,
      },
    }),
  ]);

  console.log("Seed data created successfully!");
  console.log("User:", user);
  console.log("Todos:", todos);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
