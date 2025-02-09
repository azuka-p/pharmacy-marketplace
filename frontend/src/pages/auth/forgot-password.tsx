import ForgotPassword from "@/components/auth/forgot-password/forgot-password";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ForgotPasswordPage() {
  useDocumentTitle("Pharmacy | Forgot Password");
  return (
    <>
      <ForgotPassword />
    </>
  );
}
