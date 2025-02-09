import NavPharmacist from "@/components/pharmacist/navPharmacist";
import PharmacyDetail from "@/components/pharmacist/pharmacy/pharmacyDetail";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useFetch from "@/hooks/useFetch";
import { pharmacistPharmacyDetail } from "@/models/pharmacistPharmacyResponse";

export default function PharmacyDetailPage() {
  useDocumentTitle("Pharmacy | Pharmacist Pharmacy Detail");
  const url = "/pharmacist/pharmacy";
  const { data, isLoading } = useFetch<pharmacistPharmacyDetail>(url);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData)
      return <PharmacyDetail data={fetchedData}></PharmacyDetail>;
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <NavPharmacist />
      {renderForm()}
    </div>
  );
}
