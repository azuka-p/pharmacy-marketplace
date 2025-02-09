import NavAdmin from "@/components/admin/navAdmin";
import OrderDetail from "@/components/admin/order/orderDetail";
import LoadingScreen from "@/components/reusables/loadingScreen";
import { Toaster } from "@/components/ui/toaster";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminOrderDetailResponse } from "@/models/adminOrderResponse";

export default function OrderDetailPage() {
  useDocumentTitle("Pharmacy | Admin Order Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<adminOrderDetailResponse>(url + param);
  const fetchedData = data?.data;

  const renderForm = () => {
    if (fetchedData) return <OrderDetail data={fetchedData}></OrderDetail>;
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <Toaster />
      <NavAdmin />
      {renderForm()}
    </>
  );
}
