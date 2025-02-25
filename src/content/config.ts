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
      thumbnail: image().optional(),
      author: reference("authors"),
      tags: z.array(reference("tags")).default([]),
      published: z.boolean().default(true),
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

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    color: z.string(),
  }),
});

export const collections = { blog, authors, tags };
