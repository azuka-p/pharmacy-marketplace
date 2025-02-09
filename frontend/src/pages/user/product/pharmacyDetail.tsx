import { Pharmacy } from "@/models/user/catalog";

export default function PharmacyDetail(props: { pharmacy: Pharmacy }) {
  return (
    <div className="mb-2">
      <span>Delivered from </span>
      <span className="font-semibold text-lime-600">
        {props.pharmacy.name} {props.pharmacy.address.subdistrict},{" "}
        {props.pharmacy.address.district}
      </span>
    </div>
  );
}
