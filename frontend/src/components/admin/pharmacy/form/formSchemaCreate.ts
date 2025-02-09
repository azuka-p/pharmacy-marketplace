import { z } from "zod";

export const pharmacyFormSchemaCreate = z.object({
  name: z.string().nonempty({ message: "name cannot be empty" }),
  logo: z.string().nonempty({ message: "logo cannot be empty" }),
  partner_id: z.coerce.number(),
  is_active: z.coerce.number(),
});
