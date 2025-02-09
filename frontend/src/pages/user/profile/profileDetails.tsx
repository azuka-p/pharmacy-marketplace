import ChangePassword from "./changePassword";
import { useProfileStore } from "@/store/useProfileStore";
import EditProfilePicture from "./editProfilePicture";
import EditName from "./editName";
import EditGender from "./editGender";
import DeleteProfilePicture from "./deleteProfilePicture";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfileDetails() {
  const { data } = useProfileStore();
  const gender = data?.gender;
  const navigate = useNavigate();

  return (
    <div className="flex content-start items-start justify-between gap-10">
      <div>
        <div className="flex w-44 flex-wrap justify-center gap-5">
          <img
            src={data ? data.profile_picture : ""}
            className="h-44 w-44 rounded-md border-2 object-cover"
          />
          <div className="flex flex-wrap gap-2">
            <EditProfilePicture />
            <DeleteProfilePicture />
          </div>
        </div>
        <div className="mt-4 border-t-2 border-slate-200 pt-4">
          <div className="flex w-full items-center justify-center">
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
            >
              Forgot Password
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div>
          <h2 className="mb-3 text-lg font-semibold">Profile Details</h2>
          <div className="flex w-full justify-between pb-4">
            <div className="grid h-min grid-cols-3 items-center gap-4">
              <p className="w-32">Name</p>
              <p>
                {data
                  ? data.name
                  : "https://res.cloudinary.com/du7gzvlxs/image/upload/v1736927959/buaexckhjywdntkwpllk.png"}
              </p>
              <EditName />
              <p>Gender</p>
              {data ? gender ? <p>Female</p> : <p>Male</p> : "-"}

              <EditGender />
              <p className="w-32">Email</p>
              <p>{data ? data.email : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
