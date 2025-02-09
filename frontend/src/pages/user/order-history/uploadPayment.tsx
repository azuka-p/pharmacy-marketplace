import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { uploadImageResponse } from "@/models/uploadImage";
import ErrorMsg from "@/components/reusables/utils/errorMsg";
import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadProofRequest } from "@/models/user/payment";
import { useState } from "react";

const MAX_FILE_SIZE = 524288; //500kB
const ACCEPTED_FILE_TYPES = ["image/png"];

type urlData = {
  data: { url: string };
};

const formUploadImageSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => file instanceof File, {
      message: "Please insert a file",
    })
    .pipe(
      z
        .custom<File>()
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
          message: `image must be in *.png format}`,
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `maximum file size is 500 kB`,
        }),
    ),
});

export default function UploadPayment(props: { order_id: number }) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const {
    error,
    isLoading: loadingProof,
    fetchData: requestUploadPayment,
  } = useFetch<UploadProofRequest>("/user/order-groups", {
    method: "PUT",
  });
  const {
    error: errorUploadImage,
    fetchData: responseUploadImage,
    isLoading: loadingImage,
  } = useFetch<uploadImageResponse, FormData>("/images", {
    method: "POST",
  });
  const formUploadImage = useForm<z.infer<typeof formUploadImageSchema>>({
    resolver: zodResolver(formUploadImageSchema),
    mode: "onChange",
    defaultValues: {
      image: undefined,
    },
  });

  const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const data = await responseUploadImage(formData);
    const dataURL = data?.data as urlData;
    const req: UploadProofRequest = {
      id: props.order_id,
      proof: dataURL.data.url,
    };
    const resp = await requestUploadPayment(req);
    if (resp != undefined) {
      setDisabled((prev) => !prev);
      navigate(0);
    }
  };

  if (loadingImage || loadingProof) {
    return <LoadingSpinner />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Payment Proof</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...formUploadImage}>
            <form
              id="formUploadImage"
              action="submit"
              onSubmit={(e) => handleOnSubmit(e)}
              className="w-full space-y-2"
            >
              <FormField
                control={formUploadImage.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl className="flex-grow">
                      <Input
                        type={"file"}
                        placeholder={"image"}
                        {...fieldProps}
                        accept={ACCEPTED_FILE_TYPES.join(", ")}
                        onChange={(e) =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        required
                        disabled={loadingImage}
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
              {errorUploadImage && (
                <ErrorMsg errorMsg={errorUploadImage.error[0].message} />
              )}
              <div className="mt-10 flex justify-between">
                <Button
                  type="submit"
                  form="formUploadImage"
                  className="border-none bg-primBlue hover:bg-primDarkBlue"
                  disabled={!formUploadImage.formState.isValid || loadingImage}
                >
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
