import standardObject from "./standardObject";

export type categoriesType = {
  id: number;
  name: string;
};

export type adminProductResponse = {
  id: number;
  classification: standardObject;
  form: standardObject;
  unit_in_pack: number;
  manufacturer: standardObject;
  categories: categoriesType[];
  name: string;
  generic_name: string;
  stock: number;
  usage: number;
  description: string;
  is_active: boolean;
  image: string;
};

export type adminProductDetailResponse = {
  id: number;
  classification: standardObject;
  form: standardObject;
  manufacturer: standardObject;
  categories: categoriesType[];
  name: string;
  generic_name: string;
  stock: number;
  usage: number;
  description: string;
  unit_in_pack: number;
  selling_unit: string;
  weight: string;
  height: string;
  length: string;
  width: string;
  image: string;
  is_active: boolean;
};
