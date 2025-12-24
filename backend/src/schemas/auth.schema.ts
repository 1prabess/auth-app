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

export const verifyCodeSchema = z.string().min(1).max(24);

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

export const resetPasswordSchema = z.object({
  verificationCode: verifyCodeSchema,
  password: z.string().min(6, "Password must be at least 6 characters long."),
});
