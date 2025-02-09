export type adminPharmacistResponse = {
  id: number;
  pharmacy_id: number;
  pharmacy_name: string;
  name: string;
  sipa_number: string;
  phone_number: string;
  years_of_experience: number;
  email: string;
};

export interface adminPharmacistPatch {
  id: number;
  pharmacy_id: number;
  phone_number: string;
  years_of_experience: number;
}

export interface adminPharmacistPost {
  name: string;
  sipa_number: string;
  phone_number: string;
  years_of_experience: number;
  email: string;
  password: string;
}
