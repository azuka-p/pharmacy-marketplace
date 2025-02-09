import { Minus } from "lucide-react";
import { Button } from "../ui/button";

interface DecreamentButtonProps {
  handleOnClickMinus: () => Promise<void>;
  isDescDisabled: boolean;
}

export default function DecreamentButton(props: DecreamentButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className=""
      onClick={props.handleOnClickMinus}
      disabled={props.isDescDisabled}
    >
      <Minus className="h-6 w-6" />
    </Button>
  );
}
