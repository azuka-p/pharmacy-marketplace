import { UserAddress } from "./address";

export interface EditProfileRequest {
  name: string;
  profile_picture: string;
}

export interface UserProfile {
  id: number;
  name: string;
  profile_picture: string;
  email: string;
  gender: boolean;
  is_verified: boolean;
  address: UserAddress[];
  activeAddressId: number | undefined;
}
