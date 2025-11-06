-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "t_todos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_tags" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TodoTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TodoTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TodoTags_B_index" ON "_TodoTags"("B");

-- AddForeignKey
ALTER TABLE "_TodoTags" ADD CONSTRAINT "_TodoTags_A_fkey" FOREIGN KEY ("A") REFERENCES "t_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodoTags" ADD CONSTRAINT "_TodoTags_B_fkey" FOREIGN KEY ("B") REFERENCES "t_todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
