import address from "./address";

export interface pharmacistPharmacyDetail {
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
