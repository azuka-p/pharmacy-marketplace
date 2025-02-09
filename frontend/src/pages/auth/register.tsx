import splash from "@/assets/images/auth-splash.png";
import Register from "@/components/auth/register";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function RegisterPage() {
  useDocumentTitle("Pharmacy | Register");
  return (
    <>
      <div className="h-screen w-screen">
        <img
          src={splash}
          className="h-screen w-screen object-cover opacity-80"
          alt=""
        />
      </div>
      <Register />
    </>
  );
}
