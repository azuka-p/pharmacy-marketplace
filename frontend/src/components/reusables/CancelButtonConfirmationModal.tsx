import React from "react";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ButtonConfirmationModalProps {
  message: string;
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  handleSetOpen: () => void;
  handleCancel: () => Promise<void>;
  disabled?: boolean;
}

function CancelButtonConfirmationModal(props: ButtonConfirmationModalProps) {
  return (
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-red-500 hover:bg-red-700"
            onClick={props.handleSetOpen}
            disabled={props.disabled}
          >
            Cancel Order
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[600px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{props.message}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-between gap-4">
            <Button
              className="w-full"
              data-dialog-close="true"
              variant={"outline"}
              onClick={props.handleSetOpen}
            >
              Cancel
            </Button>
            <Button
              onClick={props.handleCancel}
              className="w-full bg-destructive"
            >
              Cancel Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CancelButtonConfirmationModal;
