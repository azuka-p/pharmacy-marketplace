import "./load.css";

interface propsLoading {
  className?: string;
}
export default function LoadingSpinner(props: propsLoading) {
  return <span className={`loader m-auto ${props.className}`}></span>;
}
