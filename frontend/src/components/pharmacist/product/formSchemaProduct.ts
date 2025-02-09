import { z } from "zod";

const PRICE_MAX_LEN = 256;

export const formSchemaAddProduct = z.object({
  pharmacy_id: z.coerce
    .number({ message: "please fill the correct pharmacy id]" })
    .int()
    .gte(0, { message: "stock cannot be negative" }),
  product_id: z.coerce
    .number({ message: "please fill the correct product id" })
    .int()
    .gte(0, { message: "stock cannot be negative" }),
  stock: z.coerce
    .number({ message: "please fill the correct stock" })
    .int()
    .gte(0, { message: "stock cannot be negative" }),
  price: z
    .string()
    .min(0)
    .max(PRICE_MAX_LEN, {
      message: `maximum ${PRICE_MAX_LEN} chars`,
    })
    .refine(
      (value) => !/^\s+|\s+$/.test(value ?? ""),
      "please fill the correct price",
    ),
});

export const formSchemaProductDetail = z.object({
  id: z.coerce
    .number({ message: "please fill the correct product_id" })
    .int()
    .gte(0, { message: "catalog id cannot be negative" }),
  stock: z.coerce
    .number({ message: "please fill the correct stock" })
    .int()
    .gte(0, { message: "stock cannot be negative" }),
  price: z
    .string()
    .min(1, "Please fill the correct price")
    .max(PRICE_MAX_LEN, {
      message: `maximum ${PRICE_MAX_LEN} chars`,
    })
    .refine(
      (value) => !/^\s+|\s+$/.test(value ?? ""),
      "please fill the correct price",
    ),
  is_active: z.boolean(),
});
