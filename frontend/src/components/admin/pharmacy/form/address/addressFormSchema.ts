import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().nonempty({ message: "Cannot be Empty" }),
  phone_number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  province: z.string(),
  city: z.string(),
  district: z.string(),
  subdistrict: z.string(),
  postal_code: z.coerce
    .string()
    .min(5, { message: "Must be 5 digits" })
    .max(5, { message: "Must be 5 digits" }),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});
