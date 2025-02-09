import { Switch } from "@/components/ui/switch";
import AddAddress from "@/pages/user/address/add";
import ChangeAddress from "../address/change";
import { MapPin } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Data = {
  address: string;
};
import { useProfileStore } from "@/store/useProfileStore";

function EnableLocation() {
  return (
    <div className="flex items-center gap-3">
      <label className="w-min lg:w-full">Enable location</label>
      <Switch className="h-6 w-10" />
    </div>
  );
}

export default function NavLocation() {
  const { data } = useProfileStore();
  const address = data?.address[0];

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between md:justify-end md:gap-5 md:px-7">
        {address ? (
          <>
            <div className="flex items-center gap-2">
              <p className="hidden md:block">Shipped to: </p>
              <ChangeAddress>
                <MapPin />
                {address.subdistrict}
              </ChangeAddress>
            </div>
          </>
        ) : (
          <AddAddress />
        )}
      </div>
      {/* <div className="flex w-full flex-row items-center justify-between md:justify-end md:gap-5 md:px-7">
        <EnableLocation />
        <div className="flex items-center gap-1">
          <p className="hidden md:block">Shipped to: </p>
          {address ? (
            <>
              <ChangeAddress>
                <MapPin />
                {address.subdistrict}
              </ChangeAddress>
            </>
          ) : (
            <AddAddress />
          )}
        </div>
      </div> */}
    </>
  );
}
