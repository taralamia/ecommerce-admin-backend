import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),

  password: z
    .string({
      message: "Password is required",
    })
    .min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;