import userIcon from "@/assets/icons/userIcon.svg";
import pharmacistIcon from "@/assets/icons/pharmacyIcon.svg";
import pharmacyIcon from "@/assets/icons/pharmacyIcon.svg";
import partnerIcon from "@/assets/icons/partnerIcon.svg";
import productIcon from "@/assets/icons/productIcon.svg";
import orderIcon from "@/assets/icons/orderIcon.svg";

export const AdminManageCardData = [
  {
    title: "Manage User",
    img: userIcon,
    imgDescription: "manage user icon",
    href: "/admin/users",
  },
  {
    title: "Manage Pharmacist",
    img: pharmacistIcon,
    imgDescription: "manage pharmacist icon",
    href: "/admin/pharmacists",
  },
  {
    title: "Manage Pharmacy",
    img: pharmacyIcon,
    imgDescription: "manage pharmacy icon",
    href: "/admin/pharmacies",
  },
  {
    title: "Manage Partner",
    img: partnerIcon,
    imgDescription: "manage partner icon",
    href: "/admin/partners",
  },
  {
    title: "Manage Product",
    img: productIcon,
    imgDescription: "manage product icon",
    href: "/admin/products",
  },
  {
    title: "All Pharmacy Order List",
    img: productIcon,
    imgDescription: "manage product icon",
    href: "/admin/orders",
  },
];

export const PharmacistManageCardData = [
  {
    title: "Manage Pharmacy",
    img: pharmacyIcon,
    imgDescription: "manage pharmacy icon",
    href: "/pharmacist/pharmacy",
  },
  {
    title: "Manage Product",
    img: productIcon,
    imgDescription: "manage product icon",
    href: "/pharmacist/catalogs",
  },
  {
    title: "Manage Order",
    img: orderIcon,
    imgDescription: "manage order icon",
    href: "/pharmacist/orders",
  },
];
