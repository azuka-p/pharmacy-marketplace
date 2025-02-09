import NavPharmacist from "@/components/pharmacist/navPharmacist";
import ProductDetail from "@/components/pharmacist/product/productDetail";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useFetch from "@/hooks/useFetch";
import { pharmacistProductResponse } from "@/models/pharmacistProductResponse";

export default function ProductDetailPage() {
  useDocumentTitle("Pharmacy | Pharmacist Product Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<pharmacistProductResponse>(url + param);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData) return <ProductDetail data={fetchedData}></ProductDetail>;
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <NavPharmacist />
      {renderForm()}
    </>
  );
}
