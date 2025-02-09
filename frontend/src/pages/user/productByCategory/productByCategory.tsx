import Footer from "@/components/reusables/footer";
import Navbar from "@/pages/user/navbar/navbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ProductByCategoryCatalog from "./catalog";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ProductByCategoryPage() {
  useDocumentTitle("Pharmacy | Product By Category");
  const isDesktop = useMediaQuery("(min-width:768px)");
  return (
    <>
      <Navbar />
      <div className="flex w-full justify-center bg-slate-100 p-6">
        <div className="w-[960px]">
          <div>
            <p className="mb-3">Showing product in category:</p>
            <ProductByCategoryCatalog />
          </div>
        </div>
      </div>
      {isDesktop ? <Footer /> : <></>}
    </>
  );
}
