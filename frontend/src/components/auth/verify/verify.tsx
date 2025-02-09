import { useProfileStore } from "@/store/useProfileStore";
import VerifiedMessage from "./verified";
import VerifyActionLayout from "./verifyAction";

export default function Verify() {
  const { data } = useProfileStore();
  return (
    <>{data?.is_verified ? <VerifiedMessage /> : <VerifyActionLayout />}</>
  );
}
