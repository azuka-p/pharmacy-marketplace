import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ListAddress from "./list";

export default function ChangeAddress({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full bg-primBlue text-white"
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">List Address</DialogTitle>
          </DialogHeader>
          <ListAddress />
        </DialogContent>
      </Dialog>
    </>
  );
}
