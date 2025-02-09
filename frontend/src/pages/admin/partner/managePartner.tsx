import NavAdmin from "@/components/admin/navAdmin";
import TableAdmin from "@/components/admin/table";
import UtilityTable from "@/components/admin/utilityTable";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminPartnerResponse } from "@/models/adminPartnerResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = (data: adminPartnerResponse[] | undefined) => {
  if (!data) {
    return undefined;
  }
  return data.map((partner) => {
    return {
      id: partner.id,
      "Partner ID": "partner_" + partner.id,
      Name: partner.name,
      "Year Founded": partner.year_founded,
      "Active Days": partner.active_days
        .split(",")
        .map((day) => day.slice(0, 3))
        .join(", "),
      "Operational Hour Start": partner.operational_hour_start,
      "Operational Hour End": partner.operational_hour_end,
      Status: partner.is_active == true ? "Active" : "Inactive",
    };
  });
};

export default function ManagePartnerPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("/admin/partners");
  const { data, isLoading } =
    useFetch<PaginatedResponse<adminPartnerResponse>>(url);
  useDocumentTitle("Pharmacy | Admin Manage Partner");

  const handleOnAdd = () => {
    navigate("/admin/partners/create");
  };

  const handleSearch = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <div>
      <NavAdmin />
      <div className="mt-4 p-8">
        <UtilityTable
          addButton="+ Create Partner"
          onAdd={handleOnAdd}
          searchBy={[]}
          onSearch={handleSearch}
        />
        <TableAdmin
          isLoading={isLoading}
          onClickPagination={handleSearch}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          headerColsNum={7}
        />
      </div>
    </div>
  );
}
