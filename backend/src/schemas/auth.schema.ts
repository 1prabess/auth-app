import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    userAgent: z.string().optional(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  userAgent: z.string().optional(),
});
