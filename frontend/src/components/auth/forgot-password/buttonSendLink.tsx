import LoadingSpinner from "@/components/reusables/loading-spinner/load";
import { Button } from "@/components/ui/button";

interface ButtonSendTheLinkProps {
  form: string;
  isLoading: boolean;
  disabled: boolean;
  buttonText: string;
}

export default function ButtonSendTheLink(props: ButtonSendTheLinkProps) {
  return (
    <div className="m-auto">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Button
          form={props.form}
          type="submit"
          className={
            props.disabled
              ? "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#5f5f5f] p-6 text-xl text-white"
              : "opacity-80{} mt-6 w-[18.75rem] rounded-lg bg-[#8FC641] p-6 text-xl text-white"
          }
          disabled={props.disabled}
        >
          {props.buttonText}
        </Button>
      )}
    </div>
  );
}
