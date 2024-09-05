import { z } from "zod";

export const CreatePostSchema = z.object({
  content: z.string(),
  slug: z.string(),
  description: z.string(),
  title: z.string(),
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
