import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

const mockSearch = async (
  value: string,
  OPTIONS: Option[],
): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!value) {
        resolve(OPTIONS);
      }
      const res = OPTIONS.filter((option) =>
        option.label.toLocaleLowerCase().includes(value),
      );
      resolve(res);
    }, 100);
  });
};

interface multipleSearchSelectorProps {
  options: Option[];
  onSearch: (val: string) => void;
  onSelect: (datas: Option[]) => void;
  searchPlaceholder: string;
  groupBy?: string;
  maxSelected?: number;
  value?: Option[];
  editMode?: boolean;
}

export default function MultipleSearchSelector(
  props: multipleSearchSelectorProps,
) {
  const handleOnSearch = async (val: string) => {
    props.onSearch(val);
    const res = await mockSearch(val, props.options);
    return res;
  };
  return (
    <div>
      <Toaster />
      <div className="flex w-full flex-col gap-5">
        <MultipleSelector
          triggerSearchOnFocus
          hidePlaceholderWhenSelected
          maxSelected={props.maxSelected}
          value={props.value}
          onMaxSelected={(maxLimit) => {
            toast({
              title: `You have reached the maximum selection!`,
              description: `Maximum selection: ${maxLimit}`,
              className: "my-2",
            });
          }}
          disabled={props.editMode == true ? false : true}
          groupBy={props.groupBy}
          className={`text-red-950 !placeholder-blue-500 focus-within:ring-2 focus-within:ring-[#1a87c686] focus-within:ring-offset-0 ${
            props.editMode == false && "border-none"
          }`}
          badgeClassName="bg-white text-black hover:bg-slate-100 rounded-lg"
          onChange={(e) => props.onSelect(e)}
          onSearch={(e) => {
            return handleOnSearch(e);
          }}
          placeholder={props.searchPlaceholder}
          loadingIndicator={
            <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
              loading...
            </p>
          }
          emptyIndicator={
            <p className="w-full text-center text-lg leading-10 text-muted-foreground">
              no results found.
            </p>
          }
        />
      </div>
    </div>
  );
}
