import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function LogRegNav() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          navigate("/auth/login");
        }}
        className="w-full border-primBlue text-primBlue"
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/auth/register");
        }}
        className="w-full bg-primBlue"
      >
        Register
      </Button>
    </>
  );
}
