import ProfileDetails from "./profileDetails";
import Settings from "../settings/settings";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ProfilePage() {
  useDocumentTitle("Pharmacy | User Profile");
  return (
    <>
      <Settings>
        <ProfileDetails />
      </Settings>
    </>
  );
}
