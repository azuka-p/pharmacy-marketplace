import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type EditGenderRequest = {
  gender: boolean | undefined;
};

export default function EditGender() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primBlue">
          Change Gender
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Change Gender</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditGenderForm />
      </DialogContent>
    </Dialog>
  );
}

const FormSchema = z.object({
  // gender: z.enum(["female", "male"], {
  //   required_error: "You need to select one.",
  // }),
  gender: z.string(),
});

function GenderConverter(gender: string) {
  if (gender == "female") {
    return true;
  }
  if (gender == "male") {
    return false;
  }
}

export function EditGenderForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const {
    error,
    isLoading,
    fetchData: requestEditProfile,
  } = useFetch<EditGenderRequest>("/user/profile", {
    method: "PATCH",
  });
  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    const req: EditGenderRequest = {
      gender: GenderConverter(value.gender),
    };
    const resp = await requestEditProfile(req);
    if (resp != undefined) {
      navigate(0);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="text-md font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="text-md font-normal">Male</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Submitting
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}{" "}
      </form>
    </Form>
  );
}
