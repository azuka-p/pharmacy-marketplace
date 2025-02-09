import Footer from "@/components/reusables/footer";
import Navbar from "../navbar/navbar";
import { PaginatedResponse } from "@/models/jsonResponse";
import { GetProductCategories } from "@/models/user/productCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { useNavigate } from "react-router";
import useCatIDStore from "@/store/useCatIDStore";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ProductCategoryPage() {
  useDocumentTitle("Pharmacy | Product Category");
  const { data, isLoading } = useFetch<PaginatedResponse<GetProductCategories>>(
    `/product-categories?search_by=&search_value=&sort_order=&page=1&limit=99`,
  );
  const categories = data?.data.entries;
  const navigate = useNavigate();
  const setCategoryID = useCatIDStore((state) => state.setID);

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-slate-50">
        <div className="w-[960px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold">
                Choose Product Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                    <Skeleton className="h-7 w-[80%] content-center rounded-full text-end" />
                  </>
                ) : (
                  <>
                    {categories?.map((data) => {
                      return (
                        <Button
                          variant={"link"}
                          className="text-base"
                          onClick={() => {
                            setCategoryID(data?.id);
                            navigate(
                              `/user/catalogs?category_id=${data.id}&page=1`,
                            );
                          }}
                        >
                          {data.name}
                        </Button>
                      );
                    })}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
}
