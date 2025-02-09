import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  adminProductCategoryCreateRequest,
  adminProductCategoryCreateResponse,
} from "@/models/adminProductCategoryResponse";
import useFetch from "@/hooks/useFetch";
import { CancelButton, SubmitButton } from "@/components/reusables/formButton";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "@/components/reusables/utils/errorMsg";
import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { useToast } from "@/hooks/use-toast";

const formSchemaCreateCategory = z.object({
  name: z
    .string()
    .min(1, { message: "Product category name cannot be empty" })
    .max(256, {
      message: "Product category name must not exceed 256 characters",
    })
    .refine(
      (value) => !/^\s+|\s+$/.test(value ?? ""),
      "Please fill the correct product category name",
    ),
});

export default function CreateCategory() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    error,
    isLoading,
    fetchData: responsePost,
  } = useFetch<
    adminProductCategoryCreateResponse,
    adminProductCategoryCreateRequest
  >("/admin/product-categories", {
    method: "POST",
  });

  const form = useForm<z.infer<typeof formSchemaCreateCategory>>({
    resolver: zodResolver(formSchemaCreateCategory),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const handleOnSubmit = async (
    values: z.infer<typeof formSchemaCreateCategory>,
  ) => {
    const req = values as adminProductCategoryCreateRequest;
    const response = await responsePost(req);
    if (response?.data) {
      toast({
        title: "Product Category Created",
        description: "You can use it now!",
        className: "my-2",
      });
    }
  };

  useEffect(() => {
    if (error != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error, toast]);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid w-full grid-cols-[1fr_auto_1fr] gap-2">
                    <FormLabel className="flex items-center align-middle text-black">
                      Name
                    </FormLabel>
                    <p className="col- flex w-6 items-center text-center">:</p>
                    <FormControl className="flex-grow">
                      <div className="relative flex items-center justify-center">
                        <Input
                          placeholder="product category name"
                          {...field}
                          id="name"
                          type="text"
                          required
                        />
                      </div>
                    </FormControl>
                  </div>
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
                    onClick={() => navigate("/admin/product-categories")}
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
