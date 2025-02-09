import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const pharmacistFormCreateSchema = z.object({
  name: z
    .string()
    .min(0, { message: "Name cannot be empty" })
    .max(256, { message: "maximum 256 chars" }),
  sipa_number: z.string().nonempty({ message: "cannot be empty" }),
  phone_number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  years_of_experience: z.coerce
    .number({ message: "must be a valid number" })
    .int()
    .gte(0, { message: "cannot be negative" }),
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .max(254, { message: "Email must not exceed 254 characters" })
    .email({ message: "Invalid email format" }),
  password: z.string(),
});
