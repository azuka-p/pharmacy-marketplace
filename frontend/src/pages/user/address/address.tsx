import useDocumentTitle from "@/hooks/useDocumentTitle";
import Settings from "../settings/settings";
import ListAddress from "./list";

export default function AddressPage() {
  useDocumentTitle("Pharmacy | User Address");
  return (
    <>
      <Settings>
        <div className="w-full flex-row">
          <ListAddress />
        </div>
      </Settings>
    </>
  );
}
