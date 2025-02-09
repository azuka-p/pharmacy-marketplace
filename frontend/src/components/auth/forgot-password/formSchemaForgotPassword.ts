import { z } from "zod";

export const formSchemaForgotPassword = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .max(254, { message: "Email must not exceed 254 characters" })
    .email({ message: "Invalid email format" }),
});
