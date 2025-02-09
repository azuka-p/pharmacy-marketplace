import NavAdmin from "@/components/admin/navAdmin";
import TableAdmin from "@/components/admin/table";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { adminProductCategoryResponse } from "@/models/adminProductCategoryResponse";
import { useCategoryStore } from "@/store/ProductCategoryStore";
import { useEffect, useState } from "react";
import UtilityTable from "@/components/admin/utilityTable";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const tableData = (datas: adminProductCategoryResponse[] | undefined) => {
  if (!datas) {
    return undefined;
  }
  return datas.map((cat) => {
    return {
      id: cat.id,
      "Category ID": "category_" + cat.id,
      Name: cat.name,
    };
  });
};

export default function ProductCategoryPage() {
  useDocumentTitle("Pharmacy | Admin Product Category");
  const navigate = useNavigate();
  const [url, setUrl] = useState("/admin/product-categories");

  const { data, isLoading } =
    useFetch<PaginatedResponse<adminProductCategoryResponse>>(url);

  const handleOnClickProductTab = () => {
    navigate("/admin/products");
  };

  const handleChangeUrl = (urlResult: string) => {
    setUrl(urlResult);
  };

  const handleOnAdd = () => {
    navigate("/admin/product-categories/create");
  };

  const setCategoryData = useCategoryStore((state) => state.setData);
  useEffect(() => {
    setCategoryData(data?.data.entries);
  });
  return (
    <div>
      <NavAdmin />
      <div className="mt-4 p-8">
        <Tabs defaultValue="product-category" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="product" onClick={handleOnClickProductTab}>
              Product
            </TabsTrigger>
            <TabsTrigger value="product-category">Product Category</TabsTrigger>
          </TabsList>
          <TabsContent value="product"></TabsContent>
          <TabsContent value="product-category"></TabsContent>
        </Tabs>

        <UtilityTable
          searchPlaceHolder="Search by Name"
          addButton="+ Create Category"
          onAdd={handleOnAdd}
          onSearch={handleChangeUrl}
          searchBy={[{ value: "name", label: "Name" }]}
        />
        <TableAdmin
          onClickPagination={handleChangeUrl}
          isLoading={isLoading}
          data={tableData(data?.data.entries)}
          detailAction={true}
          url={url}
          pageInfo={data?.data.page_info}
          headerColsNum={3}
        />
      </div>
    </div>
  );
}
