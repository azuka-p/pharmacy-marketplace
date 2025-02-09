import Verify from "@/components/auth/verify/verify";
import Settings from "../settings/settings";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function VerifyAccountPage() {
  useDocumentTitle("Pharmacy | User Verify Account");
  return (
    <>
      <Settings>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Verify />
        </div>
      </Settings>
    </>
  );
}
