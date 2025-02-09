import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import AddressForm from "@/pages/user/address/addressForm";
import { useState } from "react";

export default function AddAddress() {
  const [dialogState, setDialogState] = useState<boolean>();
  return (
    <>
      <Dialog onOpenChange={(e) => setDialogState(e)} open={dialogState}>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-primBlue">
            <MapPin />
            Add New Address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center">Add New Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            handleDialog={setDialogState}
            editMode={false}
            address={undefined}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
