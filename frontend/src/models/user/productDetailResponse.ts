
export interface Pharmacy {
  id: number;
  name: string;
  location: string;
  pharmacists: Pharmacist[];
  stock: number;
  price: string;
}

export interface Pharmacist {
  id: number;
  name: string;
}