import CreateCategory from "@/components/admin/category/categoryCreate";
import NavAdmin from "@/components/admin/navAdmin";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CreateCategoryPage() {
  useDocumentTitle("Pharmacy | Admin Create Product Category");
  return (
    <>
      <NavAdmin />
      <CreateCategory />
    </>
  );
}
