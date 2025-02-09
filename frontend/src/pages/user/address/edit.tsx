import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddressFormUser from "./addressForm";
import { UserAddressFormProps } from "@/models/user/address";
import { useState } from "react";

export default function EditAddress(props: UserAddressFormProps) {
  const [dialogState, setDialogState] = useState<boolean>();

  return (
    <Dialog onOpenChange={(e) => setDialogState(e)} open={dialogState}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Address</DialogTitle>
        </DialogHeader>
        <AddressFormUser
          editMode={props.editMode}
          address={props.address}
          handleDialog={setDialogState}
        />
      </DialogContent>
    </Dialog>
  );
}
