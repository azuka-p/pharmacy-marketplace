import ProductCard from "@/components/reusables/productCard";
import { PaginationComp } from "@/components/reusables/pagination";
import { PaginatedResponse } from "@/models/jsonResponse";
import { ProductCatalog } from "@/models/user/catalog";
import useFetch from "@/hooks/useFetch";
import NoProduct from "./noProduct";
import { useState } from "react";

export default function ProductByCategoryCatalog() {
  const url = window.location.pathname;
  const param = window.location.search;
  const [fullUrl, setFullUrl] = useState(url + param);
  const { data, isLoading, error } =
    useFetch<PaginatedResponse<ProductCatalog>>(fullUrl);

  const total_row = data?.data.page_info.total_row;
  const limit = data?.data.page_info.limit;
  const numberOfPage = (total_row ? total_row : 0) / (limit ? limit : 0);
  const currentPage = data?.data.page_info.page;

  if (error != null || data?.data.page_info.total_row == 0) {
    return (
      <div className="w-full border-none bg-inherit shadow-none md:w-[960px]">
        <NoProduct />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="grid w-full grid-cols-2 justify-between gap-3 md:grid-cols-5">
          {data?.data.entries.map((data) => {
            return (
              <ProductCard
                key={data.id}
                id={data.product.id}
                image={data.product.image}
                name={data.product.name}
                unit={data.product.selling_unit}
                price={data.price}
                stock={data.stock}
                isLoading={isLoading}
                catalogId={data.id}
              ></ProductCard>
            );
          })}
        </div>
        <div className="mt-3">
          <PaginationComp
            onClickPagination={setFullUrl}
            numberOfPage={numberOfPage}
            currentPage={currentPage ? currentPage : 1}
            url={url}
          />
        </div>
      </div>
    </>
  );
}
