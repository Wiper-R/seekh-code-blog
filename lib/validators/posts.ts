import { z } from "zod";

export const CreatePostSchema = z.object({
  content: z.string(),
  slug: z.string(),
  description: z.string(),
  title: z.string(),
  status: z.enum(["draft", "archieved", "published"]),
});

export const FetchForEditPostSchema = z.object({
  slug: z.string(),
});
export const EditPostSchema = z
  .object({
    slug: z.string().min(1, "Slug is required"), // Assuming slug is required to identify the post
    update: z.object({
      slug: z.string().optional(),
      title: z.string().optional(),
      content: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["draft", "published"]).optional(),
    }),
  })
  .refine(
    (data: any) =>
      Object.keys(data["update"]).some(
        (key) => data["update"][key] !== undefined
      ),
    {
      message:
        "At least one field (title, content, description, or status) must be provided to update the post",
      path: ["_"],
    }
  );

export const GetPostSchema = z.object({ slug: z.string() });
export type GetPostSchema = z.infer<typeof GetPostSchema>;
export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
export type FetchForEditPostSchema = z.infer<typeof FetchForEditPostSchema>;
export type EditPostSchema = z.infer<typeof EditPostSchema>;
