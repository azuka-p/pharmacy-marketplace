import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import ErrorMsg from "../../reusables/utils/errorMsg";
import {
  BackButton,
  CancelButton,
  EditButton,
} from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";

import {
  pharmacistProductPatch,
  pharmacistProductPatchResponse,
  pharmacistProductResponse,
} from "@/models/pharmacistProductResponse";
import { formSchemaProductDetail } from "./formSchemaProduct";
import FieldForm from "@/components/admin/form/fieldForm";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/reusables/loadingScreen";
import { useToast } from "@/hooks/use-toast";
import { NO_CONTENT_RESPONSE_CODE } from "@/constants";
import { currencyFormat } from "@/utils/currencyFormatter";
import InputForm from "@/components/admin/form/inputForm";
import DeleteButtonConfirmationModal from "@/components/reusables/DeleteButtonConfirmationModal";

const CURRENCY = "Rp";
const PHARMACIST_CATALOGS_URL = "/pharmacist/catalogs";

interface propsDetail {
  data: pharmacistProductResponse;
}

export default function ProductDetail(props: propsDetail) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [isValidToUpdate, setIsValidToUpdate] = useState<boolean[]>([
    false,
    false,
  ]);
  const [open, setOpen] = useState(false);
  const prevStock = props.data.stock;
  const prevIsActive = props.data.is_active;
  const url = window.location.pathname;
  const form = useForm<z.infer<typeof formSchemaProductDetail>>({
    resolver: zodResolver(formSchemaProductDetail),
    mode: "onChange",
    defaultValues: {
      id: props.data.id,
      stock: props.data.stock,
      price: props.data.price,
      is_active: props.data.is_active,
    },
  });

  const handleEditMode = () => {
    form.clearErrors();
    form.reset();
    setEditMode((editMode) => !editMode);
  };

  const {
    error: errorUpdate,
    fetchData: responseUpdate,
    isLoading: isLoadingUpdate,
  } = useFetch<pharmacistProductPatchResponse, unknown>(
    PHARMACIST_CATALOGS_URL,
    { method: "PATCH" },
  );

  const { error: errorDelete, fetchData: responseDelete } = useFetch<unknown>(
    url,
    { method: "DELETE" },
  );

  const handleDelete = async () => {
    const resp = await responseDelete(props.data.id);
    if (resp?.status == NO_CONTENT_RESPONSE_CODE)
      navigate(PHARMACIST_CATALOGS_URL);
    setOpen(false);
    return;
  };

  const handleOnSubmit = async (
    data: z.infer<typeof formSchemaProductDetail>,
  ) => {
    const req: pharmacistProductPatch = {
      id: data.id != undefined ? data.id : props.data.id,
      stock: data.stock != undefined ? data.stock : props.data.stock,
      price: data.price != undefined ? data.price : props.data.price,
      is_active:
        data.is_active != undefined ? data.is_active : props.data.is_active,
    };
    const responseData = await responseUpdate(req);
    if (responseData?.data != undefined) {
      toast({
        title: "Product Updated",
        description: "The catalog has been updated",
        className: "my-2",
      });
      navigate(0);
    }
    return;
  };

  const handleOnChangeStock = (e: React.FormEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) != prevStock) {
      const updatedIsValidToUpdate = isValidToUpdate;
      updatedIsValidToUpdate[0] = true;
      setIsValidToUpdate(updatedIsValidToUpdate);
    } else {
      const updatedIsValidToUpdate = isValidToUpdate;
      updatedIsValidToUpdate[0] = false;
      setIsValidToUpdate(updatedIsValidToUpdate);
    }
  };

  const handleOnChangeIsActive = async (val: boolean) => {
    form.setValue("is_active", val);
    form.trigger("is_active");

    if (val != prevIsActive) {
      const updatedIsValidToUpdate = isValidToUpdate;
      updatedIsValidToUpdate[1] = true;
      setIsValidToUpdate(updatedIsValidToUpdate);
    } else {
      const updatedIsValidToUpdate = isValidToUpdate;
      updatedIsValidToUpdate[1] = false;
      setIsValidToUpdate(updatedIsValidToUpdate);
    }
  };

  const handleSetOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative" />
      {isLoadingUpdate && <LoadingScreen />}
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
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FieldForm label={`Product Id`}>
                    <FormControl className="flex-grow">
                      <>
                        <InputForm
                          id="price"
                          type={"number"}
                          placeholder={"product id"}
                          {...field}
                          readOnly={true}
                          className="hidden"
                          required
                          defaultValue={field.value}
                          disabled={true}
                        />
                        <p className="bg-transparent px-3 py-1 text-base opacity-100 placeholder:text-muted-foreground md:text-sm">
                          {props.data.id}
                        </p>
                      </>
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
                  <FieldForm label={"Stock"}>
                    <FormControl className="flex-grow">
                      <Input
                        type="number"
                        id="stock"
                        placeholder="stock"
                        className={`${!editMode ? "border-none" : "border-black"} shadow-none disabled:cursor-default ${editMode ? "disabled:opacity-50" : "disabled:opacity-100"}`}
                        {...form.register("stock", { valueAsNumber: true })}
                        onChangeCapture={handleOnChangeStock}
                        disabled={!editMode}
                      />
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
                      <>
                        <InputForm
                          id="price"
                          type={"number"}
                          placeholder={"price"}
                          {...field}
                          readOnly={true}
                          className="hidden"
                          required
                          defaultValue={field.value}
                          disabled={true}
                        />
                        <p className="bg-transparent px-3 py-1 text-base opacity-100 placeholder:text-muted-foreground md:text-sm">
                          {CURRENCY} {currencyFormat(Number(props.data.price))}
                        </p>
                      </>
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem>
                  <FieldForm label="Is Active">
                    <FormControl className="flex-grow">
                      <Switch
                        form="is_active"
                        checked={field.value}
                        onCheckedChange={handleOnChangeIsActive}
                        defaultChecked={props.data.is_active}
                        disabled={!editMode}
                      />
                    </FormControl>
                  </FieldForm>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            {errorUpdate && editMode && (
              <ErrorMsg errorMsg={errorUpdate.error[0].message} />
            )}
            {errorDelete && (
              <ErrorMsg errorMsg={errorDelete.error[0].message} />
            )}
          </form>
        </Form>

        <div className="mt-10 flex justify-between">
          {editMode ? (
            <CancelButton onClick={handleEditMode} />
          ) : (
            <BackButton onClick={() => navigate(PHARMACIST_CATALOGS_URL)} />
          )}

          {editMode ? (
            <Button
              className="border-none bg-primBlue hover:bg-primDarkBlue"
              form="form"
              disabled={
                !form.formState.isValid ||
                !(isValidToUpdate[0] || isValidToUpdate[1])
              }
            >
              Update
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <DeleteButtonConfirmationModal
                open={open}
                setOpen={setOpen}
                handleSetOpen={handleSetOpen}
                handleDelete={handleDelete}
                message="Are you sure you want to delete this product?"
              />
              <EditButton onClick={handleEditMode} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
