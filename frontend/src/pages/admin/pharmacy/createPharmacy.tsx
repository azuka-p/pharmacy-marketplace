import NavAdmin from "@/components/admin/navAdmin";
import PharmacyCreate from "@/components/admin/pharmacy/pharmacyCreate";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CreatePharmacyPage() {
  useDocumentTitle("Pharmacy | Admin Create Pharmacy");
  return (
    <div>
      <NavAdmin />
      <PharmacyCreate />
    </div>
  );
}
