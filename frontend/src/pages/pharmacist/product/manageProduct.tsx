import NavPharmacist from "@/components/pharmacist/navPharmacist";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { pharmacistProductResponse } from "@/models/pharmacistProductResponse";
import TablePharmacist from "../../../components/pharmacist/table";
import { Toaster } from "@/components/ui/toaster";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UtilityTable from "@/components/pharmacist/utilityTable";
import ProductFilterPharmacist from "@/components/pharmacist/product/productFilter";

const tableData = (data: pharmacistProductResponse[] | undefined) => {
  if (!data) {
    return undefined;
  }
  return data.map((product) => {
    return {
      id: product.id,
      "Product ID": "product_" + product.id,
      "Product Name": product.name,
      "Generic Name": product.generic_name,
      Manufacturer: product.manufacturer,
      Classification: product.classification,
      "Product Form": product.form,
      Stock: product.stock,
      "Status?": product.is_active,
    };
  });
};

export default function ManageProductPage() {
  useDocumentTitle("Pharmacy | Pharmacist Manage Product");
  const [url, setUrl] = useState("/pharmacist/catalogs");
  const { data, isLoading } =
    useFetch<PaginatedResponse<pharmacistProductResponse>>(url);
  const navigate = useNavigate();

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  const handleOnAdd = () => {
    navigate("/pharmacist/catalogs/add");
  };

  return (
    <>
      <Toaster />
      <NavPharmacist />
      <div className="mt-4 p-8">
        <UtilityTable
          searchPlaceHolder="Search by Name"
          onAdd={handleOnAdd}
          searchBy={[
            { value: "name", label: "Name" },
            { value: "generic_name", label: "Generic Name" },
            { value: "description", label: "Description" },
          ]}
          onSearch={handleUrlChange}
          addButton="+ Add Product"
          filters={<ProductFilterPharmacist onSelect={handleUrlChange} />}
        />
        <TablePharmacist
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          onClickPagination={handleUrlChange}
          headerColsNum={8}
        />
      </div>
    </>
  );
}
