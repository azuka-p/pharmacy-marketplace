import { useState } from "react";
import ResetPasswordCard from "./reset-password-card";
import ResetPasswordCardSuccess from "./reset-password-success";

export default function ResetPassword() {
  const [next, setNext] = useState(false);

  return (
    <>
      {!next ? (
        <ResetPasswordCard setNext={setNext} />
      ) : (
        <ResetPasswordCardSuccess />
      )}
    </>
  );
}
