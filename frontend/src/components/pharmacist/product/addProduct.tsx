import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

import LoadingSpinner from "../../reusables/loading-spinner/load";
import useFetch from "@/hooks/useFetch";
import ErrorMsg from "../../reusables/utils/errorMsg";
import { CancelButton, SubmitButton } from "../../reusables/formButton";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  pharmacistAddProductPost,
  pharmacistAddProductResponse,
} from "@/models/pharmacistProductResponse";
import FieldForm from "@/components/admin/form/fieldForm";
import { SearchSelector } from "@/components/reusables/searchSelector";
import { formSchemaAddProduct } from "./formSchemaProduct";
import { pharmacistPharmacyDetail } from "@/models/pharmacistPharmacyResponse";
import { useMemo, useState } from "react";
import { Option } from "@/components/ui/multiple-selector";
import { PaginatedResponse } from "@/models/jsonResponse";
import { adminProductResponse } from "@/models/adminProductsResponse";
import { CURRENCY } from "@/constants";

const PHARMACIST_CATALOGS_URL = "/pharmacist/catalogs";

interface addProductProps {
  data: pharmacistPharmacyDetail;
}

export default function AddProduct(props: addProductProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [productParam, setProductParam] = useState("");
  const [productId, setProductId] = useState("");
  const {
    error,
    isLoading,
    fetchData: responsePost,
  } = useFetch<pharmacistAddProductResponse, pharmacistAddProductPost>(
    PHARMACIST_CATALOGS_URL,
    {
      method: "POST",
    },
  );
  const { data: productData } = useFetch<
    PaginatedResponse<adminProductResponse>
  >("/pharmacist/products?search_value=" + productParam);
  const productOptions: Option[] | undefined = useMemo(() => {
    return productData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [productData]);

  const form = useForm<z.infer<typeof formSchemaAddProduct>>({
    resolver: zodResolver(formSchemaAddProduct),
    defaultValues: {
      pharmacy_id: props.data.id,
      product_id: undefined,
      stock: undefined,
      price: undefined,
    },
    mode: "onChange",
  });

  const handleOnSubmit = async (
    values: z.infer<typeof formSchemaAddProduct>,
  ) => {
    const req = values as pharmacistAddProductPost;
    const response = await responsePost(req);
    if (response?.data) {
      toast({
        title: "Product Added",
        description: "The product has been added to the catalog",
        className: "my-2",
      });
      navigate(PHARMACIST_CATALOGS_URL);
    }
  };

  const onClickSearchProduct = (value: string) => {
    setProductParam(value);
  };
  const onSelectSearchProduct = (value: string) => {
    setProductId(value);
    form.setValue("product_id", parseInt(value));
    form.trigger("product_id");
  };
  return (
    <>
      <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
        <Form {...form}>
          <form
            id="form"
            action="submit"
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="pharmacy_id"
              render={({ field }) => (
                <FormItem>
                  <FieldForm label={"Pharmacy Id"}>
                    <FormControl className="flex-grow">
                      <Input
                        type="number"
                        id="pharmacy_id"
                        placeholder="pharmacy_id"
                        className="border-none shadow-none disabled:cursor-default disabled:opacity-50"
                        {...field}
                        disabled={true}
                        required
                      />
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product_id"
              render={() => (
                <FormItem>
                  <FieldForm label="Product">
                    <FormControl className="flex-grow">
                      <div className="relative flex items-center justify-center">
                        <Input
                          placeholder="product id"
                          id="product_id"
                          type="number"
                          className={"hidden"}
                          {...form.register("product_id", {
                            valueAsNumber: true,
                          })}
                          required
                        />
                        <SearchSelector
                          editMode={true}
                          defaultValue={"Select Product"}
                          onSelect={onSelectSearchProduct}
                          data={productOptions ? productOptions : []}
                          placeholder={"Product Id"}
                          value={productId}
                          onSearch={onClickSearchProduct}
                        />
                      </div>
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={() => (
                <FormItem>
                  <FieldForm label="Stock">
                    <FormControl className="flex-grow">
                      <div className="relative flex items-center justify-center">
                        <Input
                          placeholder="stock"
                          id="stock"
                          type="number"
                          className={
                            "border-black shadow-none disabled:cursor-default disabled:opacity-100"
                          }
                          {...form.register("stock", { valueAsNumber: true })}
                          required
                        />
                      </div>
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FieldForm label={`Price`}>
                    <FormControl className="flex-grow">
                      <div className="relative flex items-center justify-center">
                        <div className="m-auto flex h-full flex-row items-center justify-center gap-0">
                          <div className="flex h-[34px] cursor-default items-center rounded-md rounded-r-none border border-black border-input bg-gray-100 bg-transparent px-3 py-1 text-base shadow-none ring-1 ring-black transition-colors md:text-sm">{`${CURRENCY}`}</div>

                          <Input
                            type="text"
                            id="price"
                            placeholder="price"
                            className={
                              "rounded-l-none border-black shadow-none disabled:cursor-default disabled:opacity-100"
                            }
                            {...field}
                            required
                          />
                        </div>
                      </div>
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            {error && <ErrorMsg errorMsg={error.error[0].message} />}
            <div className="mt-10 flex justify-between">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <CancelButton
                    onClick={() => navigate(PHARMACIST_CATALOGS_URL)}
                  />
                  <SubmitButton
                    form="form"
                    disabled={!form.formState.isValid}
                  />
                </>
              )}
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
