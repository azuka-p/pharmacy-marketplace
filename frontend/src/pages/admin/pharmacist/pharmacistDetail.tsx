import PharmacistDetail from "@/components/admin/pharmacist/pharmacistDetail";
import NavAdmin from "@/components/admin/navAdmin";
import useFetch from "@/hooks/useFetch";
import { adminPharmacistResponse } from "@/models/adminPharmacistResponse";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingScreen from "@/components/reusables/loadingScreen";

export default function PharmacistDetailPage() {
  useDocumentTitle("Pharmacy | Admin Pharmacist Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<adminPharmacistResponse>(url + param);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData)
      return <PharmacistDetail data={fetchedData}></PharmacistDetail>;
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}
      <NavAdmin />
      {renderForm()}
    </div>
  );
}
