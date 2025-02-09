export interface UserAddress {
  id: number;
  name: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  phone_number: string;
  postal_code: number;
  is_active: boolean;
  latitude: number;
  longitude: number;
}

export interface addressId {
  address_id: number;
}

export interface ChooseActiveAddress {
  id: number;
}

export interface UserAddressFormProps {
  handleDialog: (e: boolean) => void;
  editMode: boolean;
  address: UserAddress | undefined;
}
