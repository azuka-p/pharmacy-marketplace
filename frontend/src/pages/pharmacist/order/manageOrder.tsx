import NavPharmacist from "@/components/pharmacist/navPharmacist";
import { Toaster } from "@/components/ui/toaster";
import { PaginatedResponse } from "@/models/jsonResponse";
import useFetch from "@/hooks/useFetch";
import { pharmacistOrderResponse } from "@/models/pharmacistOrderResponse";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import TablePharmacistOrder from "@/components/pharmacist/order/tableOrder";
import { useState } from "react";

const dataHeadersMapping = new Map([
  ["id", "Order"],
  ["status", "Order Status"],
  ["product_count", "Quantity"],
  ["total_price_product", "Total Price"],
]);

export default function ManageOrderPage() {
  useDocumentTitle("Pharmacy | Pharmacist Manage Order");
  const [url, setUrl] = useState("/pharmacist/orders");
  const { data, isLoading } =
    useFetch<PaginatedResponse<pharmacistOrderResponse>>(url);

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  const renderOrderTable = () => {
    return (
      <TablePharmacistOrder
        isLoading={isLoading}
        data={data?.data.entries}
        detailAction={true}
        url={url}
        pageInfo={data?.data.page_info}
        headers={dataHeadersMapping}
        onClickPagination={handleUrlChange}
        headerColsNum={4}
      ></TablePharmacistOrder>
    );
  };
  return (
    <>
      <Toaster />
      <NavPharmacist />
      <div className="mt-4 p-8"> {renderOrderTable()}</div>
    </>
  );
}
