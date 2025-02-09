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
} from "../ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { uploadImageResponse } from "@/models/uploadImage";
import useFetch from "@/hooks/useFetch";
import ErrorMsg from "./utils/errorMsg";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from "./loadingScreen";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const MAX_FILE_SIZE = 524288; //500kB
const ACCEPTED_FILE_TYPES = ["image/png"];

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

interface uploadImageProps {
  setUploadedImage: (url: string) => void;
  isUploaded?: boolean;
}

export default function UploadImage(props: uploadImageProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const {
    error: errorUploadImage,
    fetchData: responseUploadImage,
    isLoading: isLoading,
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
    ev.stopPropagation();

    const formData = new FormData(ev.currentTarget);

    // const data = await responseEdit(req);
    const data = await responseUploadImage(formData);

    if (data?.data != undefined) {
      props.setUploadedImage((data.data.data as uploadImageResponse).url);
      toast({
        title: "Image uploaded successfully",
        description: "You can submit it now!",
        className: "my-2",
      });
      setIsOpen(false);
    }
    return;
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            {props.isUploaded == true ? "Edit" : "Upload"}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] [&>button:last-child]:hidden"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogClose
            className="absolute right-4 top-4 aspect-square w-fit rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription></DialogDescription>

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
                    <FormLabel>Image</FormLabel>
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
                        disabled={isLoading}
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
                  disabled={!formUploadImage.formState.isValid || isLoading}
                >
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
