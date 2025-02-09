import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const pharmacistFormDetailSchema = z.object({
  id: z.coerce.number(),
  name: z
    .string()
    .min(0, { message: "Name cannot be empty" })
    .max(256, { message: "maximum 256 chars" }),
  pharmacy_id: z.coerce.number().optional(),
  sipa_number: z.string().nonempty({ message: "cannot be empty" }),
  phone_number: z
    .string()
    .min(7, { message: "must be more than 7 digits" })
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
});
