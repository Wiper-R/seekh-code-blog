import { z } from "zod";

export const SearchTagsSchema = z.object({
  search: z.string(),
  limit: z.number().default(5),
});

export const CreateTagSchema = z.object({
  name: z.string(),
});

export type SearchTagsSchema = z.infer<typeof SearchTagsSchema>;
export type CreateTagSchema = z.infer<typeof CreateTagSchema>;
