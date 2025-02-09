import NavAdmin from "@/components/admin/navAdmin";
import PartnerDetail from "@/components/admin/partner/partnerDetail";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";

export default function PartnerDetailPage() {
  useDocumentTitle("Pharmacy | Admin Partner Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<adminPartnerResponse>(url + param);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData) return <PartnerDetail data={fetchedData}></PartnerDetail>;
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}
      <NavAdmin />
      {renderForm()}
    </div>
  );
}
