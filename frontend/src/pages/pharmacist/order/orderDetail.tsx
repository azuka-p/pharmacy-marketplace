import NavPharmacist from "@/components/pharmacist/navPharmacist";
import OrderDetail from "@/components/pharmacist/order/orderDetail";
import LoadingScreen from "@/components/reusables/loadingScreen";
import { Toaster } from "@/components/ui/toaster";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { pharmacistOrderDetailResponse } from "@/models/pharmacistOrderResponse";

export default function OrderDetailPage() {
  useDocumentTitle("Pharmacy | Pharmacist Order Detail");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<pharmacistOrderDetailResponse>(
    url + param,
  );
  const fetchedData = data?.data;

  const renderForm = () => {
    if (fetchedData) return <OrderDetail data={fetchedData}></OrderDetail>;
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <Toaster />
      <NavPharmacist />
      {renderForm()}
    </>
  );
}
