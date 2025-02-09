import NavAdmin from "@/components/admin/navAdmin";
import TableAdmin from "@/components/admin/table";
import useFetch from "@/hooks/useFetch";
import { adminProductResponse } from "@/models/adminProductsResponse";
import { PaginatedResponse } from "@/models/jsonResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import ProductFilter from "@/components/admin/product/productFilter";
import UtilityTable from "@/components/admin/utilityTable";
import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import ImageTable from "@/components/reusables/imageTable";

const tableData = (datas: adminProductResponse[] | undefined) => {
  if (!datas) {
    return undefined;
  }
  return datas.map((product) => {
    return {
      id: product.id,
      "Product ID": "product_" + product.id,
      Classification: product.classification.name,
      Form: product.form ? product.form.name : "null",
      Manufacturer: product.manufacturer.name,
      Name: product.name,
      "Generic Name": product.generic_name,
      Description: product.description,
      Stock: product.stock,
      Usage: product.usage,
      Image: ImageTable(product.image),
      Status: product.is_active == true ? "Active" : "InActive",
    };
  });
};

export default function ManageProductPage() {
  const [url, setUrl] = useState("/admin/products");
  useDocumentTitle("Pharmacy | Admin Manage Product");
  const { data, isLoading } =
    useFetch<PaginatedResponse<adminProductResponse>>(url);

  const navigate = useNavigate();
  const handleOnClickProductCategoryTab = () => {
    navigate("/admin/product-categories");
  };

  const handleUrlChange = (urlResult: string) => {
    setUrl(urlResult);
  };

  return (
    <div className="overflow-hidden">
      <NavAdmin />
      <div className="mt-4 p-8">
        <Tabs defaultValue="product">
          <TabsList className="mb-8">
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger
              value="product-category"
              onClick={handleOnClickProductCategoryTab}
            >
              Product Category
            </TabsTrigger>
          </TabsList>
          <TabsContent value="product"></TabsContent>
          <TabsContent value="product-category"></TabsContent>
        </Tabs>
        <UtilityTable
          searchPlaceHolder="Search by Name"
          onAdd={() => navigate("/admin/products/create")}
          searchBy={[
            { value: "name", label: "Name" },
            { value: "generic_name", label: "Generic Name" },
            { value: "description", label: "Description" },
          ]}
          onSearch={handleUrlChange}
          addButton="+ Create Product"
          filters={<ProductFilter onSelect={handleUrlChange} />}
        />
        <TableAdmin
          onClickPagination={handleUrlChange}
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          headerColsNum={11}
        ></TableAdmin>
      </div>
    </div>
  );
}
