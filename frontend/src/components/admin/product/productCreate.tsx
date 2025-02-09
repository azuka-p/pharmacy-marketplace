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
import { adminProductResponse } from "@/models/adminProductsResponse";
import { CancelButton, SubmitButton } from "../../reusables/formButton";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import ErrorMsg from "../../reusables/utils/errorMsg";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import { Toaster } from "../../ui/toaster";
import { useMemo, useState } from "react";
import { formSchema } from "./productFormSchema";
import FieldForm from "../form/fieldForm";
import MultipleSearchSelector from "@/components/reusables/multipleSearchSelector";
import { SearchSelector } from "@/components/reusables/searchSelector";
import { PaginatedResponse } from "@/models/jsonResponse";
import { adminProductCategoryResponse } from "@/models/adminProductCategoryResponse";
import { Option } from "@/components/ui/multiple-selector";
import InputForm from "../form/inputForm";
import UploadImage from "@/components/reusables/uploadImage";
import ImageTable from "@/components/reusables/imageTable";

const SPECIAL_CLASSIFICATION = [
  "obat bebas",
  "obat bebas terbatas",
  "obat keras",
];
export default function ProductCreate() {
  const navigate = useNavigate();
  const [imageState, setImageState] = useState("");
  const [mandatoryFields, setMandatoryFields] = useState([
    "name",
    "generic_name",
    "manufacturer_id",
    "description",
    "categor_ids",
    "classification_id",
    "weight",
    "height",
    "length",
    "width",
    "image",
  ]);

  const [mandatorySpecial, setMandatorySpecial] = useState(false);
  const {
    error,
    isLoading,
    fetchData: responsePost,
  } = useFetch<adminProductResponse, unknown>("/admin/products", {
    method: "POST",
  });
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoriesNumber = form.getValues().category_ids;
    formData.delete("category_ids");
    categoriesNumber.forEach((val) => {
      formData.append("category_ids", JSON.stringify(parseInt(val)));
    });

    const response = await responsePost(formData);
    if (response?.status == 201) {
      navigate("/admin/products");
    }
  };

  const [manufactureState, setManufactureState] = useState({
    Id: "",
    Name: "",
  });
  const [categoriesParam, setCategoriesParam] = useState("");
  const [classificationState, setClassificationState] = useState({
    Id: "",
    Name: "",
  });
  const [productFormState, setProductFormState] = useState({
    Id: "",
    Name: "",
  });
  const { data: manufactureData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-manufacturers");
  const manufactureOption: Option[] | undefined = useMemo(() => {
    return manufactureData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [manufactureData]);
  const { data: categoriesData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-categories?search_value=" + categoriesParam);
  const { data: classificationData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-classifications");
  const { data: productFormData } = useFetch<
    PaginatedResponse<adminProductCategoryResponse>
  >("/admin/product-forms");
  const categoriesOption: Option[] | undefined = useMemo(() => {
    return categoriesData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [categoriesData]);
  const classificationOption: Option[] | undefined = useMemo(() => {
    return classificationData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [classificationData]);
  const productFormOption: Option[] | undefined = useMemo(() => {
    return productFormData?.data.entries.map((val) => {
      const opt: Option = {
        label: val.name,
        value: String(val.id),
      };
      return opt;
    });
  }, [productFormData]);

  const onSelectSearchManufacture = (value: string, label: string) => {
    setManufactureState(() => {
      return { Id: value, Name: label };
    });
    form.setValue("manufacturer_id", parseInt(value));
    form.trigger("manufacturer_id");
  };
  const onClickSearchCategories = (value: string) => {
    setCategoriesParam(value);
  };
  const onSelectSearchCategories = (datas: Option[]) => {
    const categoriesString = datas.map((val) => {
      return val.value;
    });
    form.setValue("category_ids", categoriesString);
    form.trigger("category_ids");
  };

  const onSelectSearchClassification = (value: string, label: string) => {
    setClassificationState(() => {
      return { Id: value, Name: label };
    });
    handleOnChangeClassification(label);
    form.setValue("classification_id", parseInt(value));
    form.trigger("classification_id");
  };
  const onSelectSearchProductForm = (value: string, label: string) => {
    setProductFormState(() => {
      return { Id: value, Name: label };
    });
    form.setValue("form_id", parseInt(value));
    form.trigger("form_id");
  };

  const handleOnChangeClassification = (e: string) => {
    if (SPECIAL_CLASSIFICATION.includes(e.toLowerCase())) {
      setMandatorySpecial(true);
      setMandatoryFields([...mandatoryFields, "form_id", "unit_in_pack"]);
    } else {
      setMandatorySpecial(false);
      setMandatoryFields(
        mandatoryFields
          .filter((item) => item != "form_id")
          .filter((item) => item != "unit_in_pack"),
      );
    }
  };

  const handleOnUploadedImage = (url: string) => {
    setImageState(url);
    form.setValue("image", url);
    form.trigger("image");
  };

  const handleOnChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(e.target.value))) {
      e.target.value = parseInt(e.target.value, 10).toString();
    } else {
      e.target.value = "";
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      generic_name: "",
      description: "",
      form_id: undefined,
      unit_in_pack: undefined,
      selling_unit: undefined,
      weight: undefined,
      height: undefined,
      length: undefined,
      width: undefined,
      image: undefined,
      is_active: false,
    },
  });

  return (
    <section className="m-auto mt-10 w-fit max-w-2xl rounded-2xl border p-4 shadow-xl">
      <Toaster />
      <Form {...form}>
        <form
          id="form"
          action="submit"
          onSubmit={(e) => handleOnSubmit(e)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Name"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"text"}
                      placeholder={"name"}
                      {...field}
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
            name="generic_name"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Generic Name"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"text"}
                      placeholder={"generic name"}
                      {...field}
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
            name="manufacturer_id"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Manufacturer"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <>
                      <Input
                        type={"text"}
                        placeholder={"Manufacturer_id"}
                        {...field}
                        readOnly={true}
                        className="hidden"
                        required
                      />
                      <SearchSelector
                        data={manufactureOption ? manufactureOption : []}
                        placeholder="Manufacture"
                        value={manufactureState.Id}
                        onSearch={() => {}}
                        onSelect={onSelectSearchManufacture}
                      />
                    </>
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Description"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"text"}
                      placeholder={"description"}
                      {...field}
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
            name="category_ids"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Categories"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <>
                      <Input
                        className="hidden"
                        {...field}
                        required={true}
                        readOnly={true}
                      />
                      <MultipleSearchSelector
                        editMode={true}
                        onSelect={onSelectSearchCategories}
                        options={categoriesOption ? categoriesOption : []}
                        onSearch={onClickSearchCategories}
                        searchPlaceholder={"Select Categories"}
                      />
                    </>
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classification_id"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Classification"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <>
                      <Input
                        type={"text"}
                        className="hidden"
                        {...field}
                        required={true}
                        readOnly={true}
                        value={parseInt(classificationState.Id)}
                      />
                      <SearchSelector
                        data={classificationOption ? classificationOption : []}
                        placeholder="Classification"
                        value={classificationState.Id}
                        onSearch={() => {}}
                        onSelect={onSelectSearchClassification}
                      />
                    </>
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="form_id"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Product Form"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <>
                      <Input
                        type={"text"}
                        placeholder={"product form"}
                        className="hidden"
                        {...field}
                        required={true}
                        readOnly={true}
                      />
                      <SearchSelector
                        data={productFormOption ? productFormOption : []}
                        placeholder={"Select Form"}
                        value={productFormState.Id}
                        onSearch={() => {}}
                        onSelect={onSelectSearchProductForm}
                      />
                    </>
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit_in_pack"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Unit in Pack"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"unit in pack"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
                      required={mandatorySpecial}
                    />
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selling_unit"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Selling Unit"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"selling unit"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
                    />
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Weigth"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"weight"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
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
            name="height"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Height"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"height"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
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
            name="length"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Length"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"length"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
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
            name="width"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="width"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Input
                      type={"number"}
                      placeholder={"width"}
                      {...field}
                      onChangeCapture={handleOnChangeNumber}
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FieldForm
                  label="Image"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <>
                      <InputForm
                        defaultValue={field.value}
                        className="hidden"
                        type={"string"}
                        placeholder={"image"}
                        {...field}
                        required
                      />
                      <div className="flex items-center gap-4">
                        {imageState && ImageTable(imageState)}
                        <UploadImage
                          setUploadedImage={handleOnUploadedImage}
                          isUploaded={imageState != ""}
                        />
                      </div>
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
                <FieldForm
                  label="Is Active"
                  mandatory={mandatoryFields.includes(field.name)}
                >
                  <FormControl className="flex-grow">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FieldForm>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          {error && <ErrorMsg errorMsg={error.error[0].message} />}
        </form>
      </Form>
      <div className="mt-10 flex justify-between">
        <CancelButton onClick={() => navigate("/admin/products")} />
        <SubmitButton form="form" disabled={!form.formState.isValid} />
      </div>
    </section>
  );
}
