import useFetch from "@/hooks/useFetch";
import { UserProfile } from "@/models/user/profile";
import { useProfileStore } from "@/store/useProfileStore";
import { useEffect } from "react";

export function GetProfile() {
  const setProfileData = useProfileStore((state) => state.setData);

  const url = `/user/profile`;
  const { data } = useFetch<UserProfile>(url);
  const userProfile = data?.data;
  if (userProfile != undefined && userProfile.address[0]) {
    userProfile.activeAddressId = userProfile?.address.filter(
      (address) => address.is_active,
    )[0].id;
  }
  useEffect(() => {
    if (data != undefined) {
      setProfileData(userProfile);
    }
  }, [data, userProfile]);
}
