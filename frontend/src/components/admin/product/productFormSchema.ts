import { z } from "zod";

const NAME_MAX_LEN = 75;
const GENERIC_NAME_MAX_LEN = 256;
const DESCRIPTION_MAX_LEN = 256;
const SPECIAL_CLASSIFICATION = [2];

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "name cannot be empty" })
      .max(NAME_MAX_LEN, { message: `maximum ${NAME_MAX_LEN} chars` })
      .refine(
        (value) => !/^\s+|\s+$/.test(value ?? ""),
        "please fill the correct name",
      ),
    generic_name: z
      .string()
      .min(1, { message: "generic name cannot be empty" })
      .max(GENERIC_NAME_MAX_LEN, {
        message: `maximum ${GENERIC_NAME_MAX_LEN} chars`,
      })
      .refine(
        (value) => !/^\s+|\s+$/.test(value ?? ""),
        "please fill the correct generic name",
      ),
    manufacturer_id: z.coerce
      .number()
      .int()
      .gte(0, { message: "manufacturer cannot be negative" })
      .optional(),
    description: z
      .string()
      .min(1, { message: "description cannot be empty" })
      .max(DESCRIPTION_MAX_LEN, {
        message: `maximum ${DESCRIPTION_MAX_LEN} chars`,
      })
      .refine(
        (value) => !/^\s+|\s+$/.test(value ?? ""),
        "please fill the correct description",
      ),
    category_ids: z.array(z.string()),
    classification_id: z.coerce
      .number()
      .int()
      .gte(0, { message: "product classification cannot be negative" })
      .optional(),
    form_id: z
      .number()
      .int()
      .gte(0, { message: "product classification cannot be negative" }),
    unit_in_pack: z.coerce
      .number()
      .int()
      .gte(0, { message: "unit in pack cannot be negative" }),
    selling_unit: z.string().optional(),
    weight: z.coerce.string().nonempty({ message: "weight cannot be empty" }),
    height: z.coerce.string().nonempty({ message: "height cannot be empty" }),
    length: z.coerce.string().nonempty({ message: "length cannot be empty" }),
    width: z.coerce.string().nonempty({ message: "width cannot be empty" }),
    image: z.string(),
    is_active: z.boolean().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.classification_id) {
      if (SPECIAL_CLASSIFICATION.includes(val.classification_id)) {
        if (val.form_id == undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "please fill product form",
            path: ["form_id"],
          });
        }
        if (val.unit_in_pack == undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "please fill unit in pack",
            path: ["unit_in_pack"],
          });
        }
      }
    }
  });
