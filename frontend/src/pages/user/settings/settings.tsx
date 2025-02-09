import { Button } from "@/components/ui/button";
import Navbar from "@/pages/user/navbar/navbar";
import Footer from "@/components/reusables/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useProfileStore } from "@/store/useProfileStore";
import { Link } from "react-router-dom";

interface Menu {
  title: string;
  url: string;
  class?: string;
}
const menus: Menu[] = [
  { title: "Profile", url: "/user/profile" },
  { title: "Address", url: "/user/address" },
  { title: "Orders", url: "/user/order-history" },
];

function SettingsMenu(props: Menu) {
  return (
    <Link to={props.url} className={props.class}>
      <Button
        className="hover:none mb-2 box-border w-full p-0"
        variant={"ghost"}
      >
        {props.title}
      </Button>
    </Link>
  );
}

export default function Settings({ children }: { children: React.ReactNode }) {
  const { data } = useProfileStore();

  return (
    <>
      <Navbar />
      <div className="flex h-full w-full justify-center bg-slate-50">
        <div className="w-max-[960px] my-10">
          <Card className="p-3">
            <CardContent className="">
              <div className="flex pt-6">
                <div className="border-r-2">
                  {menus.map((menu, key) => {
                    return (
                      <SettingsMenu
                        key={key}
                        title={menu.title}
                        url={menu.url}
                        class="h-full w-full"
                      />
                    );
                  })}
                  {data?.is_verified ? (
                    <SettingsMenu
                      title="You are verified!"
                      url="#"
                      class="font-extrabold text-primBlue"
                    />
                  ) : (
                    <SettingsMenu
                      title="Verify Account!"
                      url="verify"
                      class="font-extrabold text-primBlue underline"
                    />
                  )}
                </div>
                <div className="w-full px-4">{children}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
