import { prisma } from "@repo/database";

/**
 * Tagテーブルの全データを取得する
 * @returns tag配列
 */
export const getAllTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

/**
 * ID指定でTagデータを取得する
 * @param id TagのID
 * @returns Tagデータ
 */
export const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  return tag;
};

/**
 * 新しいTagを作成する
 * @param title
 * @param color
 */
export const createTag = async (title: string, color?: string) => {
  const tag = await prisma.tag.create({
    data: {
      title,
      color,
    },
  });

  return tag;
};

/**
 * ID指定でTagデータを更新する
 * @param id
 * @param title
 * @param color
 */
export const updateTagById = async (
  id: string,
  title?: string,
  color?: string
) => {
  const tag = await prisma.tag.update({
    where: { id },
    data: {
      title,
      color,
    },
  });

  return tag;
};

/**
 * ID指定でTagデータを削除する
 * @param id
 */
export const deleteTagById = async (id: string) => {
  await prisma.tag.delete({
    where: { id },
  });
};
