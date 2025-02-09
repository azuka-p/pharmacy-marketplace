export default interface address {
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  name: string;
  phone_number: string;
  latitude: number;
  longitude: number;
}

export interface province {
  id: string;
  name: string;
}

export interface city {
  id: string;
  province_id: string;
  name: string;
}

export interface district {
  id: string;
  city_id: string;
  name: string;
}

export interface subDistrict {
  id: string;
  district_id: string;
  name: string;
}
