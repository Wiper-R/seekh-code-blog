import { CreatePostSchema } from "@/lib/validators/posts";
import { actionWrapper } from "./action-wrapper";
import db from "@/prisma/db";
import { getSession } from "@/auth/utils";

export const createPost = actionWrapper(async (_data: CreatePostSchema) => {
  const data = await CreatePostSchema.parseAsync(_data);
  const user = await getSession();
  const post = await db.post.create({ data: { ...data, authorId: user.id } });
  return post;
});
