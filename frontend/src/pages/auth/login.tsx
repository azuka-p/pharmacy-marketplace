import Login from "../../components/auth/login";
import splash from "../../assets/images/auth-splash.png";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function LoginPage() {
  useDocumentTitle("Pharmacy | Login");
  return (
    <div className="h-screen w-screen">
      <img
        className="h-screen w-screen object-cover opacity-80"
        src={splash}
        alt=""
      />
      <Login />
    </div>
  );
}
