import NavAdmin from "@/components/admin/navAdmin";
import CreatePartner from "@/components/admin/partner/partnerCreate";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CreatePartnerPage() {
  useDocumentTitle("Pharmacy | Admin Create Partner");
  return (
    <div>
      <NavAdmin />
      <CreatePartner />
    </div>
  );
}
