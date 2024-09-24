"use server";
import {
  FetchForEditPostSchema,
  CreatePostSchema,
  EditPostSchema,
  GetPostSchema,
} from "@/lib/validators/posts";
import { actionWrapper } from "./action-wrapper";
import db from "@/prisma";
import { getUser } from "./auth";
import { Forbidden, UnAuthenticated } from "@/lib/api/error";
import { getCoverImage } from "@/lib/utils";

export const createPost = actionWrapper(async (_data: CreatePostSchema) => {
  const data = await CreatePostSchema.parseAsync(_data);
  const user = await getUser();
  if (!user) throw UnAuthenticated;
  if (
    !["rshivang12345@gmail.com", "rdhruva12345@gmail.com"].includes(user.email)
  )
    throw Forbidden;
  const post = await db.post.create({
    data: {
      content: data.content,
      description: data.description,
      slug: data.slug,
      status: data.status,
      title: data.title,
      authorId: user.id,
    },
  });
  return post;
});

async function generateRandomSlug() {
  const randomSlug = () => Math.random().toString(36).substring(2, 10);
  var slug = randomSlug();

  while (true) {
    const post = await db.post.findFirst({ where: { slug } });
    if (!post) return slug;
    slug = randomSlug();
  }
}

export const createBlankPost = actionWrapper(async (_data: {}) => {
  const user = await getUser();
  if (!user) throw UnAuthenticated;
  if (
    !["rshivang12345@gmail.com", "rdhruva12345@gmail.com"].includes(user.email)
  )
    throw Forbidden;
  const slug = await generateRandomSlug();
  const post = await db.post.create({
    data: {
      content: "",
      description: "",
      slug,
      status: "draft",
      title: "Untitled",
      authorId: user.id,
    },
  });

  return post;
});

export const fetchForEditPost = actionWrapper(
  async (_data: FetchForEditPostSchema) => {
    const data = await FetchForEditPostSchema.parseAsync(_data);
    const user = await getUser();
    if (!user) return null;
    const post = await db.post.findFirst({
      where: { slug: data.slug, authorId: user.id },
    });
    if (!post) return null;
    return post;
  }
);

export const editPost = actionWrapper(async (_data: EditPostSchema) => {
  // TODO: Don't allow extra param
  const data = await EditPostSchema.parseAsync(_data);
  const user = await getUser();
  if (!user) throw UnAuthenticated;
  const post = await db.post.findFirst({
    where: { slug: data.slug, authorId: user.id },
  });
  if (!post) throw Forbidden;
  const update: typeof data.update & { coverImage?: string } = {
    ...data.update,
  };
  if (data.update.content) {
    const coverImage = getCoverImage(data.update.content);
    update.coverImage = coverImage;
  }
  const updated = await db.post.update({
    where: { id: post.id },
    data: update,
  });
  return updated;
});

export const getAdminPanelPosts = actionWrapper(async () => {
  const user = await getUser();
  if (!user) throw UnAuthenticated;
  const posts = await db.post.findMany({ where: { authorId: user.id } });
  return [...posts];
});

export const getPost = actionWrapper(async (_data: GetPostSchema) => {
  const data = await GetPostSchema.parseAsync(_data);
  const post = await db.post.findFirst({
    where: { slug: data.slug },
    include: { author: true },
  });
  return post;
});

export const fetchPosts = actionWrapper(async () => {
  return await db.post.findMany({
    where: { status: "published" },
    include: {
      author: { select: { image: true, name: true, username: true } },
    },
  });
});
