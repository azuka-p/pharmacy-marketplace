import NavAdmin from "@/components/admin/navAdmin";
import PharmacyDetail from "@/components/admin/pharmacy/pharmacyDetail";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminPharmacyDetail } from "@/models/adminPharmacyResponse";

export default function PharmacyDetailPage() {
  useDocumentTitle("Pharmacy | Admin Pharmacy Detail");

  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<adminPharmacyDetail>(url + param);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData)
      return <PharmacyDetail data={fetchedData}></PharmacyDetail>;
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}
      <NavAdmin />
      {renderForm()}
    </div>
  );
}
