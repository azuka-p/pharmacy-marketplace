export interface ProductCatalog {
  id: number;
  price: string;
  stock: number;
  product: {
    id: number;
    name: string;
    selling_unit: string;
    image: string;
  };
}

export interface ProductCatalogDetail {
  id: number;
  price: string;
  stock: number;
  product: Product;
  pharmacy: Pharmacy;
  distance: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  generic_name: string;
  manufacturer: string;
  classification: string;
  form: string;
  description: string;
  unit_in_pack: number;
  selling_unit: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  categories: ProductCategory[];
  image: string;
}

export interface Address {
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  name: string;
}

export interface Pharmacy {
  id: number;
  name: string;
  address: Address;
}
