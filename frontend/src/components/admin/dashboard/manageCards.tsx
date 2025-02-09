import arrowRight from "@/assets/icons/arrow-right-circle.svg";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ADMIN_ROLE, PHARMACIST_ROLE, USER_ROLE } from "./dashboard";
import {
  AdminManageCardData,
  PharmacistManageCardData,
} from "./manageCardData";

interface ManageCardsProps {
  role: number | undefined;
}

export default function ManageCards(props: ManageCardsProps) {
  let data: any[] = [];
  switch (props.role) {
    case ADMIN_ROLE:
      data = AdminManageCardData;
      break;
    case PHARMACIST_ROLE:
      data = PharmacistManageCardData;
      break;
  }

  return (
    <>
      <div className="row-span-2 grid grid-cols-2 gap-4">
        {data.map((item, idx) => (
          <Card
            className="rounded-md px-4 py-4 align-middle hover:scale-105 hover:cursor-pointer"
            key={idx}
          >
            <Link
              to={item.href}
              className="flex h-full w-full flex-row justify-between gap-2"
            >
              <div className="flex flex-row gap-4">
                <img width={"40px"} src={item.img} alt={item.imgDescription} />
                <h2 className="m-auto text-xl font-bold">{item.title}</h2>
              </div>
              <div className="my-auto justify-center">
                <img width={"40px"} src={arrowRight} alt="chevron right icon" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
