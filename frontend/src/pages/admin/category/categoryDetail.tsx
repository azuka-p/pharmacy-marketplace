import NavAdmin from "@/components/admin/navAdmin";
import CategoryDetail from "@/components/admin/category/categoryDetail";
import { useCategoryStore } from "@/store/ProductCategoryStore";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CategoryDetailPage() {
  useDocumentTitle("Pharmacy | Admin Product Category Detail");
  const path = window.location.pathname;
  const id = path.split("/").at(-1);
  const fetchedData = useCategoryStore
    .getState()
    .data?.find((item) => item.id === Number(id));

  const renderForm = () => {
    if (fetchedData != undefined)
      return <CategoryDetail data={fetchedData}></CategoryDetail>;
  };
  return (
    <>
      <NavAdmin />
      {renderForm()}
    </>
  );
}
