import NoProduct from "@/pages/user/catalog/noProductNearby";
import ProductCard from "@/components/reusables/productCard";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { PaginatedResponse } from "@/models/jsonResponse";
import { ProductCatalog } from "@/models/user/catalog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Catalog() {
  const [page, setPage] = useState<number>(1);

  const {
    data: catalogData,
    isLoading,
    error,
  } = useFetch<PaginatedResponse<ProductCatalog>>(
    `/user/catalogs?search_by=&search_value=&page=${page}&limit=20`,
  );

  if (catalogData?.data.page_info.total_row == 0 || error != null) {
    return (
      <div className="w-full border-none bg-inherit shadow-none md:w-[960px]">
        <h1 className="mb-3 text-xl font-semibold">Most Popular Products</h1>
        <NoProduct />
      </div>
    );
  }

  const total_row = catalogData?.data.page_info.total_row;
  const limit = catalogData?.data.page_info.limit;
  const numberOfPage = (total_row ? total_row : 0) / (limit ? limit : 0);
  const currentPage = catalogData?.data.page_info.page;
  const isPrevAvail = currentPage != 1;
  const isNextAvail = (currentPage ? currentPage : 1) < numberOfPage;

  return (
    <div className="w-full border-none bg-inherit shadow-none md:w-[960px]">
      <h1 className="mb-3 text-xl font-semibold">Most Popular Products</h1>
      <div className="grid w-full grid-cols-2 justify-between gap-3 md:grid-cols-5">
        {catalogData?.data.entries.map((data) => {
          return (
            <ProductCard
              key={data.id}
              id={data.product.id}
              catalogId={data.id}
              image={data.product.image}
              name={data.product.name}
              unit={data.product.selling_unit}
              price={data.price}
              stock={data.stock}
              isLoading={isLoading}
            ></ProductCard>
          );
        })}
      </div>
      <div className="mt-3 flex w-full justify-center">
        <div className="flex">
          <Button
            variant={"ghost"}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            disabled={!isPrevAvail}
          >
            <ChevronLeft />
            Previous
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            disabled={!isNextAvail}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="grid w-full grid-cols-5 justify-between gap-3"></div>
    </div>
  );
}

export function CatalogNoAddress() {
  const { data, isLoading, error } = useFetch<ProductCatalog[]>("/catalogs");
  if (error != null) {
    return (
      <div className="w-full border-none bg-inherit shadow-none md:w-[960px]">
        <h1 className="mb-3 text-xl font-semibold">Most Popular Products</h1>
        <NoProduct />
      </div>
    );
  }
  return (
    <>
      <div className="w-full border-none bg-inherit shadow-none md:w-[960px]">
        <h1 className="mb-3 text-xl font-semibold">Most Popular Products</h1>
        <div className="grid w-full grid-cols-2 justify-between gap-3 md:grid-cols-5">
          {data?.data.map((data) => {
            return (
              <ProductCard
                key={data.id}
                id={data.product.id}
                catalogId={data.id}
                image={data.product.image}
                name={data.product.name}
                unit={data.product.selling_unit}
                price={data.price}
                stock={data.stock}
                isLoading={isLoading}
              ></ProductCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
