import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Settings from "../settings/settings";
import OrderContentPending from "./orderPendingCard";
import OrderContent from "./orderCard";


  // import OrderCard from "./orderCard";

const menu = [
  {
    name: "Pending",
  },
  {
    name: "Verifying",
  },
  {
    name: "Processed",
  },
  {
    name: "Sent",
  },
  {
    name: "Confirmed",
  },
  {
    name: "Canceled",
  },
];

export default function OrderHistoryPage() {
  useDocumentTitle("Pharmacy | User Order History");
  // const { data } = useFetch<PaginatedResponse<OrderPending>>(
  //   "/user/orders/pending",
  // );
  return (
    <>
      <Settings>
        <div className="flex w-full justify-center">
          <Tabs defaultValue="Processed" className="w-full">
            <TabsList className="flex w-full justify-between">
              {menu.map((data) => {
                return (
                  <TabsTrigger key={data.name} value={data.name}>
                    {data.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <TabsContent value="Pending">
              <OrderContentPending />
            </TabsContent>
            <TabsContent value="Verifying">
              <div className="flex flex-col gap-3">
                <OrderContent filter="verifying" />
              </div>
            </TabsContent>
            <TabsContent value="Processed">
              <div className="flex flex-col gap-3">
                <OrderContent filter="processed" />
              </div>
            </TabsContent>
            <TabsContent value="Sent">
              <div className="flex flex-col gap-3">
                <OrderContent filter="sent" />
              </div>
            </TabsContent>
            <TabsContent value="Confirmed">
              <div className="flex flex-col gap-3">
                <OrderContent filter="order_confirmed" />
              </div>
            </TabsContent>
            <TabsContent value="Canceled">
              <div className="flex flex-col gap-3">
                <OrderContent filter="canceled" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Settings>
    </>
  );
}
