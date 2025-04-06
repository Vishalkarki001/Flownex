"use client";
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username must be at most 20 characters long"),
  
  email: z.string()
    .min(10, "Email must be at least 10 characters long")
    .email("Invalid email format"),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password must be at most 16 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter") // Ensures a letter
    .regex(/\d/, "Password must contain at least one number")      // Ensures a number
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
});

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
})

