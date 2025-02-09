import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface IncreamentButtonProps {
  handleOnClickPlus: () => Promise<void>;
  isIncDisabled: boolean;
}

export default function IncreamentButton(props: IncreamentButtonProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              variant="ghost"
              size="icon"
              className=""
              onClick={props.handleOnClickPlus}
              disabled={props.isIncDisabled}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="shadow-xsm-4 text-md rounded-lg bg-white p-2 font-medium text-gray-900 ring-2 ring-gray-400"
          hidden={!props.isIncDisabled}
        >
          <p>reach maximum stock limit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
