import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { GetProductCategories } from "@/models/user/productCategory";
import { PaginatedResponse } from "@/models/jsonResponse";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useCatIDStore from "@/store/useCatIDStore";

export default function Categories() {
  const { data, isLoading } = useFetch<PaginatedResponse<GetProductCategories>>(
    "/product-categories?search_by=&search_value=&sort_order=&page=&limit=24",
  );
  const categories = data?.data.entries;

  const setCategoryID = useCatIDStore((state) => state.setID);

  const navigate = useNavigate();
  return (
    <>
      <Card className="w-[960px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Categories</CardTitle>
            <Button
              variant="link"
              className="text-primBlue"
              onClick={() => {
                navigate("categories");
              }}
            >
              See all categories
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center p-0 pb-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-[90%]"
          >
            {isLoading ? (
              <div className="grid w-full grid-cols-4 gap-4">
                <Skeleton className="h-8 w-full rounded-full text-end" />
                <Skeleton className="h-8 w-full rounded-full text-end" />
                <Skeleton className="h-8 w-full rounded-full text-end" />
                <Skeleton className="h-8 w-full rounded-full text-end" />
              </div>
            ) : (
              <CarouselContent>
                <CarouselItem>
                  <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                    {categories?.slice(0, 8).map((data) => {
                      return (
                        <Button
                          key={data?.id}
                          variant="outline"
                          className="h-10 w-full cursor-pointer rounded-full text-end"
                          onClick={() => {
                            setCategoryID(data?.id);
                            navigate(
                              `user/catalogs?category_id=${data.id}&page=1`,
                            );
                          }}
                        >
                          {data.name}
                        </Button>
                      );
                    })}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                    {categories?.slice(8, 16).map((data) => {
                      return (
                        <Button
                          key={data?.id}
                          variant="outline"
                          className="h-10 w-full cursor-pointer rounded-full text-end"
                        >
                          {data.name}
                        </Button>
                      );
                    })}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                    {categories?.slice(16, 24).map((data) => {
                      return (
                        <Button
                          key={data?.id}
                          variant="outline"
                          className="h-10 w-full cursor-pointer rounded-full text-end"
                        >
                          {data.name}
                        </Button>
                      );
                    })}
                  </div>
                </CarouselItem>
              </CarouselContent>
            )}
          </Carousel>
        </CardContent>
      </Card>
    </>
  );
}
