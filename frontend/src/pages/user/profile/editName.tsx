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
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useProfileStore } from "@/store/useProfileStore";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

type EditNameRequest = {
  name: string;
};

export default function EditName() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primBlue">
          Change Name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Change Name</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditNameForm />
      </DialogContent>
    </Dialog>
  );
}

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
});

function EditNameForm() {
  const navigate = useNavigate();
  const { data } = useProfileStore();
  const setProfileData = useProfileStore((state) => state.setData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ? data?.name : "User",
    },
  });
  const {
    error,
    isLoading,
    fetchData: requestEditProfile,
  } = useFetch<EditNameRequest>("/user/profile", {
    method: "PATCH",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resp = await requestEditProfile(values);
    if (resp != undefined) {
      navigate(0);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="your name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
        )}
      </form>
    </Form>
  );
}
