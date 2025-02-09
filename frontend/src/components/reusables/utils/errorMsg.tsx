interface errorProps {
  errorMsg: string | undefined;
  className?: string;
}
export default function ErrorMsg(props: errorProps) {
  return <p className={`text-red-600 ${props.className}`}>{props.errorMsg}</p>;
}
