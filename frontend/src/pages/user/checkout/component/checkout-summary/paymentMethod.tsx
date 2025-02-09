import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodProps {
  onClick: () => void;
}

export default function PaymentMethod(props: PaymentMethodProps) {
  return (
    <div className="grid grid-cols-1 gap-2 py-3">
      <h2 className="text-lg font-bold">Payment Method</h2>
      <RadioGroup>
        <div className="flex w-full items-center justify-between space-x-2">
          <Label htmlFor="manual-transfer" className="text-base">
            Manual Transfer
          </Label>
          <RadioGroupItem
            value="manual-transfer"
            id="manual-transfer"
            onClick={props.onClick}
          />
        </div>
      </RadioGroup>
    </div>
  );
}
