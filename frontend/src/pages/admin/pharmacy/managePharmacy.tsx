import NavAdmin from "@/components/admin/navAdmin";
import TableAdmin from "@/components/admin/table";
import UtilityTable from "@/components/admin/utilityTable";
import ImageTable from "@/components/reusables/imageTable";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminPharmacyResponse } from "@/models/adminPharmacyResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = (data: adminPharmacyResponse[] | undefined) => {
  if (!data) {
    return undefined;
  }
  return data.map((pharmacy) => {
    return {
      id: pharmacy.id,
      "Pharmacy ID": "pharmacy_" + pharmacy.id,
      Name: pharmacy.name,
      Partner: pharmacy.partner.name,
      Logo: ImageTable(pharmacy.logo),
      Address: pharmacy.address,
      Status: pharmacy.is_active == true ? "Active" : "Inactive",
    };
  });
};

export default function ManagePharmacyPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("/admin/pharmacies");
  const { data, isLoading } =
    useFetch<PaginatedResponse<adminPharmacyResponse>>(url);
  useDocumentTitle("Pharmacy | Admin Manage Pharmacy");

  const handleOnAdd = () => {
    navigate("/admin/pharmacies/create");
  };

  const handleChangeUrl = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <div>
      <NavAdmin />
      <div className="mt-4 p-8">
        <UtilityTable
          searchPlaceHolder="Search by Name"
          addButton="+ Create Pharmacy"
          onAdd={handleOnAdd}
          searchBy={[]}
          onSearch={handleChangeUrl}
        />
        <TableAdmin
          onClickPagination={handleChangeUrl}
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          headerColsNum={5}
        />
      </div>
    </div>
  );
}
