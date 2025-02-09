import AddressCard from "./card";
import { DialogFooter } from "@/components/ui/dialog";
import AddAddress from "./add";
import { useProfileStore } from "@/store/useProfileStore";

export default function ListAddress() {
  const { data } = useProfileStore();
  const addresses = data?.address;

  return (
    <>
      <div className="mb-5 max-h-96 overflow-y-auto">
        {addresses?.map((address) => {
          return (
            <div className="mb-3" key={address.id}>
              <AddressCard address={address} />
            </div>
          );
        })}
      </div>
      <DialogFooter>
        <AddAddress />
      </DialogFooter>
    </>
  );
}
