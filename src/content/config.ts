import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      author: reference("authors"),
      tags: z.array(z.string()).default(() => []),
    }),
});

const authors = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      displayName: z.string(),
      website: z.string(),
      avatar: image().optional(),
    }),
});

export const collections = { blog, authors };
