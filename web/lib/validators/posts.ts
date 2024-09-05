import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string(),
  slug: z.string(),
  description: z.string(),
  title: z.string(),
});
