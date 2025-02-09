import { Button } from "../ui/button";
import trashIcon from "../../assets/icons/trash.svg";
import editIcon from "../../assets/icons/edit.svg";
import backIcon from "../../assets/icons/back.svg";
import cancelIcon from "../../assets/icons/cancel.svg";

interface propsButton {
  child?: string;
  onClick?: () => void;
  disabled?: boolean;
  form?: string;
  className?: string;
  isLoading?: boolean;
}

export function EditButton(props: propsButton) {
  return (
    <Button
      className="bg-yellow-400 hover:bg-yellow-600"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <img src={editIcon} width={"18px"} alt="edit icon" />
      {props.child ? props.child : "Edit"}
    </Button>
  );
}

export function SubmitButton(props: propsButton) {
  return (
    <Button
      form={props.form}
      disabled={props.disabled}
      className={`hover:bg-primDarkBlue border-none bg-primBlue ${props.className}`}
      onClick={props.onClick}
    >
      {props.child ? props.child : "Submit"}
    </Button>
  );
}

export function BackButton(props: propsButton) {
  return (
    <Button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <img src={backIcon} width={"20px"} alt="back icon" />
      {props.child ? props.child : "Back"}
    </Button>
  );
}

export function CancelButton(props: propsButton) {
  return (
    <Button
      className={`bg-red-500 hover:bg-red-700 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <img src={cancelIcon} width={"20px"} alt="back icon" />
      {props.child ? props.child : "Cancel"}
    </Button>
  );
}

export function DeleteButton(props: propsButton) {
  return (
    <Button
      className={`bg-red-500 hover:bg-red-700 ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <img src={trashIcon} width={"16px"} alt="trash icon" />
      {props.child ? props.child : "Delete"}
    </Button>
  );
}
