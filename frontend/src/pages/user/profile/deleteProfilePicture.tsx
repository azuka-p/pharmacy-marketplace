import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";

export default function DeleteProfilePicture() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  const {
    error,
    isLoading,
    fetchData: requestRemovePicture,
  } = useFetch<unknown>("/user/profile/remove-picture", {
    method: "PATCH",
  });

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleRemovePicture = async () => {
    const resp = await requestRemovePicture();
    if (resp != undefined) {
      navigate(0);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" onClick={handleSetOpen}>
            Remove Picture
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            {/* <DialogTitle>Are you sure?</DialogTitle> */}
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DeleteButtonConfirmationModal
                message="Are you sure you want to remove your profile picture?"
                open={open}
                setOpen={setOpen}
                handleSetOpen={handleSetOpen}
                handleDelete={handleRemovePicture}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
