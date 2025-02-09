import NavAdmin from "@/components/admin/navAdmin";
import TableAdminOrder from "@/components/admin/order/tableOrder";
import TableAdmin from "@/components/admin/table";
import getOrderStatusBadge from "@/components/reusables/getOrderStatusBadge";
import { Toaster } from "@/components/ui/toaster";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminOrderResponse } from "@/models/adminOrderResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useState } from "react";

const tableData = (data: adminOrderResponse[] | undefined) => {
  if (!data) {
    return undefined;
  }
  return data.map((order) => {
    return {
      id: order.id,
      "Order ID": "INV/" + order.id,
      Pharmacy: order.pharmacy.name,
      Status: getOrderStatusBadge(String(order.status.name)),
    };
  });
};

export default function ManageOrderPage() {
  useDocumentTitle("Pharmacy | Admin Manage Order");
  const [url, setUrl] = useState("/admin/orders");
  const { data, isLoading } =
    useFetch<PaginatedResponse<adminOrderResponse>>(url);

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <>
      <Toaster />
      <NavAdmin />
      <div className="mt-4 p-8">
        <TableAdmin
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          onClickPagination={handleUrlChange}
          headerColsNum={3}
        />
      </div>
    </>
  );
}
