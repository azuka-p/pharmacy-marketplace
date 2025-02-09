import NavAdmin from "@/components/admin/navAdmin";
import ProductDetail from "@/components/admin/product/productDetail";
import LoadingScreen from "@/components/reusables/loadingScreen";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminProductDetailResponse } from "@/models/adminProductsResponse";

export default function ProductDetailPage() {
  useDocumentTitle("Pharmacy | Admin Product Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<adminProductDetailResponse>(url + param);
  const fetchedData = data?.data;
  const renderForm = () => {
    if (fetchedData) return <ProductDetail data={fetchedData}></ProductDetail>;
  };
  return (
    <div>
      {isLoading && <LoadingScreen />}
      <NavAdmin />
      {renderForm()}
    </div>
  );
}
