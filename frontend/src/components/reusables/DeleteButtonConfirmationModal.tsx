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
import { DeleteButton } from "./formButton";

interface ButtonConfirmationModalProps {
  message: string;
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  handleSetOpen: () => void;
  handleDelete: () => Promise<void>;
}

function DeleteButtonConfirmationModal(props: ButtonConfirmationModalProps) {
  return (
    <>
      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogTrigger asChild>
          <DeleteButton onClick={props.handleSetOpen} />
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
              onClick={props.handleDelete}
              className="w-full bg-destructive"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteButtonConfirmationModal;
