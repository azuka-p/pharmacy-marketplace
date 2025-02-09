import { Link } from "react-router-dom";

interface navLinkProps {
  href: string;
  children: string;
  swtichTab?: string;
}

export default function NavLink(props: navLinkProps) {
  const currentRoute = location.pathname.toLowerCase().split("/")[2];
  return (
    <Link
      to={"/admin/" + props.href}
      className={`text-2xl ${
        (currentRoute == props.href || currentRoute == props.swtichTab) &&
        "font-bold text-primBlue"
      }`}
    >
      {props.children}
    </Link>
  );
}
