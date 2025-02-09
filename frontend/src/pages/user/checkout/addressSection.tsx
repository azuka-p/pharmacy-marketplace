import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangeAddress from "../address/change";
import { useProfileStore } from "@/store/useProfileStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AddressContainer() {
  const { data, getActiveAddress } = useProfileStore();
  const address = getActiveAddress();

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardDescription className="uppercase">
            Delivery address
          </CardDescription>
          <CardTitle>
            {data ? (
              <p className="text-xl">{data.name}</p>
            ) : (
              <Skeleton className="h-6 w-[10%]" />
            )}
          </CardTitle>
          <CardDescription className="uppercase">
            {address ? (
              address.phone_number
            ) : (
              <Skeleton className="h-4 w-[10%]" />
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          {address ? (
            <div className="flex w-full items-center justify-between">
              <p>
                {address.name}, {address.subdistrict}, {address.district},
                {address.city}, {address.province}
              </p>
              <ChangeAddress>Change</ChangeAddress>
            </div>
          ) : (
            <>
              <Skeleton className="h-6 w-[70%]" />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
