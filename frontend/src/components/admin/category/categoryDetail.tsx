import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  adminCategoryPatch,
  adminProductCategoryResponse,
} from "@/models/adminProductCategoryResponse";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import ErrorMsg from "@/components/reusables/utils/errorMsg";
import {
  BackButton,
  CancelButton,
  EditButton,
  SubmitButton,
} from "@/components/reusables/formButton";
import { useNavigate } from "react-router-dom";
import { NO_CONTENT_RESPONSE_CODE } from "@/constants";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";
import LoadingScreen from "@/components/reusables/loadingScreen";

interface propsDetail {
  data: adminProductCategoryResponse;
}

export default function CategoryDetail(props: propsDetail) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const url = window.location.pathname;
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleEditMode = () => {
    form.clearErrors();
    form.reset();
    setEditMode((editMode) => !editMode);
  };

  const headers = Object.keys(props.data);
  const editableFields = ["name"];
  const fieldsMap = [{ Id: "number" }, { Name: "text" }];

  const {
    error: errorEdit,
    fetchData: responseEdit,
    isLoading: isLoadingEdit,
  } = useFetch<adminProductCategoryResponse, adminCategoryPatch>(
    "/admin/product-categories",
    { method: "PATCH" },
  );

  const {
    error: errorDelete,
    fetchData: responseDelete,
    isLoading: isLoadingDelete,
  } = useFetch<unknown>(url, { method: "DELETE" });

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = form.getValues() as adminCategoryPatch;
    const req: adminCategoryPatch = {
      id: formData.id,
      name: formData.name,
    };

    const data = await responseEdit(req);
    if (data?.data != undefined) {
      setEditMode(false);
    }
    return;
  };

  const handleDelete = async () => {
    const resp = await responseDelete(props.data.id);
    if (resp?.status == NO_CONTENT_RESPONSE_CODE)
      navigate("/admin/product-categories");
    setOpen(false);
    return;
  };

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      {(isLoadingDelete || isLoadingEdit) && <LoadingScreen />}
      <Form {...form}>
        <form
          id="form"
          action="submit"
          onSubmit={(e) => handleOnSubmit(e)}
          className="w-full space-y-2"
        >
          {headers.map((header, key) => {
            const value =
              props.data[header as keyof adminProductCategoryResponse];
            const fieldName = header as keyof z.infer<typeof formSchema>;
            const isEditable = editableFields.includes(fieldName as string);
            return (
              <FormField
                control={form.control}
                key={key}
                name={fieldName}
                defaultValue={value as string}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid w-full grid-cols-[1fr_auto_1fr] gap-2">
                      <FormLabel className="flex items-center align-middle text-black">
                        {Object.keys(fieldsMap[key])[0]}
                      </FormLabel>
                      <p className="col- flex w-6 items-center text-center">
                        :
                      </p>
                      <FormControl className="flex-grow">
                        <Input
                          type={Object.values(fieldsMap[key])[0]}
                          className={`${!isEditable || !editMode ? "border-none" : "border-black"} text-right shadow-none disabled:cursor-default ${editMode && !isEditable ? "disabled:opacity-50" : "disabled:opacity-100"}`}
                          // placeholder={header}
                          {...field}
                          disabled={!editMode || !isEditable}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
            );
          })}
          {errorEdit && editMode && (
            <ErrorMsg errorMsg={errorEdit.error[0].message} />
          )}
          {errorDelete && <ErrorMsg errorMsg={errorDelete.error[0].message} />}
        </form>
      </Form>

      <div className="mt-10 flex justify-between">
        {editMode ? (
          <CancelButton onClick={handleEditMode} />
        ) : (
          <BackButton onClick={() => navigate("/admin/product-categories")} />
        )}

        {editMode ? (
          <SubmitButton form="form" disabled={!form.formState.isValid} />
        ) : (
          <div className="flex items-center gap-4">
            <EditButton onClick={handleEditMode} />
            <DeleteButtonConfirmationModal
              message="Are you sure you want to delete this category"
              handleDelete={handleDelete}
              open={open}
              setOpen={setOpen}
              handleSetOpen={handleSetOpen}
            />
          </div>
        )}
      </div>
    </section>
  );
}
