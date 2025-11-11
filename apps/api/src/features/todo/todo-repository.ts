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
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  return todo;
};

/**
 * 新しいTodoを作成する
 * @param title
 * @param description
 * @param priority
 * @param dueDate
 */
export const createTodo = async (
  title: string,
  description?: string,
  priority?: Priority,
  dueDate?: Date
) => {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      priority,
      dueDate,
    },
  });

  return todo;
};

/**
 * ID指定でTodoデータを更新する
 * @param id
 * @param title
 * @param description
 * @param priority
 * @param dueDate
 */
export const updateTodoById = async (
  id: string,
  title?: string,
  description?: string,
  priority?: Priority,
  dueDate?: Date
) => {
  const todo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      description,
      priority,
      dueDate,
    },
  });

  return todo;
};

/**
 * ID指定でTodoデータを削除する
 * @param id
 */
export const deleteTodoById = async (id: string) => {
  await prisma.todo.delete({
    where: { id },
  });
};
