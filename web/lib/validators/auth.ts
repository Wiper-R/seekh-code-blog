import { z } from "zod";

export const loginSchema = z.object({
  username_or_email: z.string(),
  password: z.string(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
