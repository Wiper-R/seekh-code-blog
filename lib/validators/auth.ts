import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export type SignUpSchema = z.infer<typeof SignUpSchema>;
