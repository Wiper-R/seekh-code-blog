import { z } from "zod";

export default z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
});
