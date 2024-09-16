"use server";
import { CreateTagSchema, SearchTagsSchema } from "@/lib/validators/tags";
import { actionWrapper } from "./action-wrapper";
import db from "@/prisma";

export const createTag = actionWrapper(async (_data: CreateTagSchema) => {
  const data = await CreateTagSchema.parseAsync(_data);
  const tag = await db.tag.create({ data: { name: data.name } });
  return tag;
});

export const searchTags = actionWrapper(async (_data: SearchTagsSchema) => {
  const data = await SearchTagsSchema.parseAsync(_data);
  const tags = await db.tag.findMany({
    where: { name: { contains: data.search } },
    take: data.limit,
  });
  return tags;
});

export const getTags = actionWrapper(async () => {
  const tags = await db.tag.findMany({});
  return tags;
});

export const deleteTag = actionWrapper(async (_data: CreateTagSchema) => {
  const data = await CreateTagSchema.parseAsync(_data);
  await db.tag.delete({ where: { name: data.name } });
});
