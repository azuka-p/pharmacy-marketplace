import ResetPassword from "@/components/auth/reset-password/reset-password";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ResetPasswordPage() {
  useDocumentTitle("Pharmacy | Reset Password");
  return (
    <>
      <ResetPassword />
    </>
  );
}
