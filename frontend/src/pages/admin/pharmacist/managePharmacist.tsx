import NavAdmin from "@/components/admin/navAdmin";
import PharmacistFilter from "@/components/admin/pharmacist/pharmacistFilter";
import TableAdmin from "@/components/admin/table";
import UtilityTable from "@/components/admin/utilityTable";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetch from "@/hooks/useFetch";
import { adminPharmacistResponse } from "@/models/adminPharmacistResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = (data: adminPharmacistResponse[] | undefined) => {
  if (!data) {
    return undefined;
  }
  return data.map((pharmacist) => {
    return {
      id: pharmacist.id,
      "Pharmacist ID": "pharmacist_" + pharmacist.id,
      Pharmacy: pharmacist.pharmacy_name,
      Name: pharmacist.name,
      "Sipa Number": pharmacist.sipa_number,
      "Phone Number": pharmacist.phone_number,
      "Years of Experience": pharmacist.years_of_experience,
      Email: pharmacist.email,
    };
  });
};

export default function ManagePharmacistPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("/admin/pharmacists");
  const { data, isLoading } =
    useFetch<PaginatedResponse<adminPharmacistResponse>>(url);
  useDocumentTitle("Pharmacy | Admin Manage Pharmacist");

  const handleOnAdd = () => {
    navigate("/admin/pharmacists/create");
  };

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <div>
      <NavAdmin />
      <div className="mt-4 p-8">
        <UtilityTable
          addButton="+ Add Pharmacist"
          onAdd={handleOnAdd}
          searchBy={[
            { label: "Name", value: "name" },
            { label: "Email", value: "email" },
            { label: "Sipa Number", value: "sipa_number" },
            { label: "Phone Number", value: "phone_number" },
          ]}
          onSearch={handleUrlChange}
          filters={<PharmacistFilter onSelect={handleUrlChange} />}
        />
        <TableAdmin
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          onClickPagination={handleUrlChange}
          headerColsNum={7}
        />
      </div>
    </div>
  );
}
