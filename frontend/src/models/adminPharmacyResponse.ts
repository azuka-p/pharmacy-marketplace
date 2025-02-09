import address from "./address";
import standardObject from "./standardObject";

export interface adminPharmacyResponse {
  id: number;
  partner: standardObject;
  name: string;
  logo: string;
  address: string;
  is_active: boolean;
}

export interface adminPharmacyDetail {
  id: number;
  partner: {
    id: number;
    name: string;
  };
  address: address;
  name: string;
  logo: string;
  pharmacists: {
    id: number;
    pharmacy_id: number;
    name: string;
    sipa_number: string;
    phone_number: string;
    years_of_experience: 5;
  }[];
  logistic_partners: {
    id: number;
    name: string;
  }[];
  is_active: false;
}
