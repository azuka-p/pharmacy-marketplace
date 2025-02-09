import { Label } from "@/components/ui/label";

interface propsFormLabel {
  className?: string;
  children: string;
  htmlFor?: string;
}

export default function FormLabel(props: propsFormLabel) {
  return (
    <Label htmlFor={props.htmlFor} className={`text-sm ${props.className}`}>
      {props.children}
    </Label>
  );
}
