import NavPharmacist from "@/components/pharmacist/navPharmacist";
import AddProduct from "@/components/pharmacist/product/addProduct";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { pharmacistPharmacyDetail } from "@/models/pharmacistPharmacyResponse";

export default function AddProductPage() {
  useDocumentTitle("Pharmacy | Pharmacist Add Product");
  const url = "/pharmacist/pharmacy";
  const { data, isLoading } = useFetch<pharmacistPharmacyDetail>(url);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData) {
      return <AddProduct data={fetchedData} />;
    }
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <NavPharmacist />
      {renderForm()}
    </>
  );
}
