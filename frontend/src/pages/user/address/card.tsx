import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import EditAddress from "./edit";
import { useProfileStore } from "@/store/useProfileStore";
import { ChooseActiveAddress, UserAddress } from "@/models/user/address";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";

interface addressCardProps {
  address: UserAddress;
}

export default function AddressCard(props: addressCardProps) {
  const {
    data: profile,
    setActiveAddressId: setActive,
    getActiveAddress,
    deleteAddress: deleteAddressZustand,
  } = useProfileStore();
  const [open, setOpen] = useState(false);
  const activeAddressId = getActiveAddress();

  const { fetchData: deleteAddress } = useFetch<unknown>(
    `/user/addresses/${props.address.id}`,
    {
      method: "DELETE",
    },
  );
  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleDelete = async () => {
    handleSetOpen();

    const resp = await deleteAddress();
    if (resp?.data != undefined) {
      toast({
        title: "Successfully deleted address!",
        className: "my-2",
      });
      deleteAddressZustand(props.address.id);
    }
  };

  const { fetchData: chooseActive } = useFetch<ChooseActiveAddress>(
    `/user/addresses/activate`,
    {
      method: "PATCH",
    },
  );

  const handleChoose = async () => {
    const resp = await chooseActive({ id: props.address.id });
    if (resp != undefined) {
      setActive(props.address.id);
    }
  };
  return (
    <>
      <Card
        className={
          props.address.id === getActiveAddress()?.id
            ? "border-[1px] border-primBlue bg-sky-100"
            : "bg-white"
        }
      >
        <CardHeader>
          <CardTitle>{profile?.name}</CardTitle>
          <CardDescription>{props.address.phone_number}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p>{props.address.name}</p>
          {props.address.id == activeAddressId?.id ? (
            <>
              <Check className="stroke-primBlue" />
            </>
          ) : (
            <Button onClick={handleChoose}>Choose</Button>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          {props.address.id == activeAddressId?.id ? (
            <></>
          ) : (
            <>
              <EditAddress
                handleDialog={() => {}}
                editMode={true}
                address={props.address}
              />
              <DeleteButtonConfirmationModal
                message="Are you sure you want to delete this address?"
                open={open}
                setOpen={setOpen}
                handleSetOpen={handleSetOpen}
                handleDelete={handleDelete}
              />
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
