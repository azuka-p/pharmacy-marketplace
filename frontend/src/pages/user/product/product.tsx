import Footer from "@/components/reusables/footer";
import Navbar from "@/pages/user/navbar/navbar";
import Description from "./description";
import PharmacyDetail from "./pharmacyDetail";
import ProductDetail from "./productDetail";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { ProductCatalogDetail } from "@/models/user/catalog";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import CounterButton from "@/components/reusables/counterButton";

export default function ProductPage() {
  useDocumentTitle("Pharmacy | Product");
  const url = window.location.pathname;
  const param = window.location.search;
  const { data, isLoading } = useFetch<ProductCatalogDetail>(url + param);
  const catalogDetail = data?.data.product;
  const pharmacy = data?.data.pharmacy;

  return (
    <>
      <Navbar />
      <div className="flex w-full justify-center bg-slate-100 p-6">
        <div className="w-[960px]">
          <div className="flex gap-8">
            {isLoading ? (
              <>
                <Skeleton className="mb-2 h-60 w-60 rounded-sm" />
                <div>
                  <Skeleton className="mb-2 h-5 w-60 rounded-sm" />
                  <Skeleton className="mb-2 h-7 w-60 rounded-sm" />
                  <Skeleton className="mb-1 h-4 w-[60%] rounded-sm" />
                </div>
              </>
            ) : (
              <>
                <img
                  src={catalogDetail?.image}
                  className="h-80 w-80 rounded-lg object-cover"
                />
                <div className="w-[70vw]">
                  <ProductDetail
                    key={catalogDetail?.id}
                    name={catalogDetail ? catalogDetail?.name : "product name"}
                    price={data ? data.data.price : "99999"}
                    selling_unit={
                      catalogDetail
                        ? catalogDetail?.selling_unit
                        : "selling unit"
                    }
                  />
                  <div className="w-full border-b-2 pb-4 pt-2">
                    {pharmacy && data?.data ? (
                      <>
                        <PharmacyDetail pharmacy={pharmacy} />
                        <CounterButton
                          buttonClassName="w-full"
                          id={data?.data.product.id}
                          stockLimit={data?.data.stock ?? 0}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {catalogDetail ? <Description props={catalogDetail} /> : ""}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
