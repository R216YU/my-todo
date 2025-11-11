import { Priority, prisma } from "@repo/database";

/**
 * Todoテーブルの全データを取得する
 * @returns todo配列
 */
export const getAllTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

/**
 * ID指定でTodoデータを取得する
 * @param id TodoのID
 * @returns Todoデータ
 */
export const getTodoById = async (id: string) => {
  const todo = await prisma.todo.findUniqueOrThrow({
    where: { id },
  });
  return todo;
};

export type CreateTodo = {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
};
/**
 * 新しいTodoを作成する
 * @param data Todoデータ
 * @returns 作成されたTodoデータ
 */
export const createTodo = async (data: CreateTodo) => {
  const todo = await prisma.todo.create({
    data,
  });
  return todo;
};
