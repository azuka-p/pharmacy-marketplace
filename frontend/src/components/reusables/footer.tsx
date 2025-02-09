import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import instagram from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import youtube from "../../assets/icons/youtube.svg";
import { Copyright } from "lucide-react";
import { Button } from "../ui/button";

function FooterMenu() {
  return (
    <div className="flex justify-between gap-x-12 border-b-[1px] pb-2">
      <div className="flex flex-col items-start">
        <h3 className="mb-4 text-xl font-semibold">Pharmacy</h3>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          About Us
        </Button>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Career
        </Button>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Blog
        </Button>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Contact Us
        </Button>
      </div>
      <div className="flex flex-col items-start">
        <h3 className="mb-4 text-xl font-semibold">Others</h3>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Terms & Condition
        </Button>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Privacy
        </Button>
        <Button variant="link" className="text-md p-0 font-normal text-white">
          Register your pharmacy
        </Button>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>
        <div className="flex gap-4">
          <Button variant={"link"} className="p-0">
            <img alt="facebook" src={facebook} />
          </Button>
          <Button variant={"link"} className="p-0">
            <img alt="twitter" src={twitter} />
          </Button>
          <Button variant={"link"} className="p-0">
            <img alt="instagram" src={instagram} />
          </Button>
          <Button variant={"link"} className="p-0">
            <img alt="linkedin" src={linkedin} />
          </Button>
          <Button variant={"link"} className="p-0">
            <img alt="youtube" src={youtube} />
          </Button>
        </div>
      </div>
    </div>
  );
}
export function CopyrightSection() {
  return (
    <div className="py-3">
      <span>
        Copyright <Copyright className="inline" /> 2025 Pharmacy
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="clear-both w-full bg-primBlue text-white">
      <div className="m-auto w-[960px] flex-col p-6">
        <FooterMenu />
        <CopyrightSection />
      </div>
    </footer>
  );
}
