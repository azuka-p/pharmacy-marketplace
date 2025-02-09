export type pharmacistProductResponse = {
  id: number;
  stock: number;
  price: string;
  is_active: boolean;
  name: string;
  generic_name: string;
  manufacturer: string;
  classification: string;
  form: string;
  description: string;
  unit_in_pack: number;
  selling_unit: string;
  image: string;
};

export type pharmacistAddProductPost = {
  pharmacy_id: number;
  product_id: number;
  stock: number;
  price: string;
};

export type pharmacistAddProductResponse = {
  id: number;
  pharmacy_id: number;
  product_id: number;
  stock: number;
  price: string;
  is_active: boolean;
};

export type pharmacistProductPatch = {
  id: number;
  stock: number;
  price: string;
  is_active: boolean;
};

export type pharmacistProductPatchResponse = {
  id: number;
  pharmacy_id: number;
  product_id: number;
  stock: number;
  price: string;
  is_active: boolean;
};
