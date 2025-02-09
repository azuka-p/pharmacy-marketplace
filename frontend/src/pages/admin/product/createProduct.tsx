import NavAdmin from "@/components/admin/navAdmin";
import ProductCreate from "@/components/admin/product/productCreate";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CreateProductPage() {
  useDocumentTitle("Pharmacy | Admin Create Product");
  return (
    <>
      <NavAdmin />
      <ProductCreate />
    </>
  );
}
