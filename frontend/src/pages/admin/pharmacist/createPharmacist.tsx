import NavAdmin from "@/components/admin/navAdmin";
import CreatePharmacist from "@/components/admin/pharmacist/pharmacistCreate";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CreatePharmacistPage() {
  useDocumentTitle("Pharmacy | Admin Create Pharmacist");
  return (
    <div>
      <NavAdmin />
      <CreatePharmacist />
    </div>
  );
}
