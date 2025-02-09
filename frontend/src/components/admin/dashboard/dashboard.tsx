import NavAdmin from "@/components/admin/navAdmin";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import ProfileCard from "./profileCard";
import ManageCards from "./manageCards";
import OrderStatistic from "./orderStatistic";
import { MonthlyReportSection } from "./monthlyReport";
import SalesReportSection from "./salesReport";
import { useDecodedJWTStore } from "@/store/useDecodedJWTStore";
import { useShallow } from "zustand/shallow";
import NavPharmacist from "@/components/pharmacist/navPharmacist";
import { Toaster } from "@/components/ui/toaster";

export const ADMIN_ROLE = 1;
export const USER_ROLE = 2;
export const PHARMACIST_ROLE = 3;

export default function AdminDashboardPage() {
  useDocumentTitle("Pharmacy | Admin Dashboard");
  const data = useDecodedJWTStore(useShallow((state) => state));
  const role = data.data?.role;

  return (
    <>
      <Toaster />
      {role === ADMIN_ROLE && (
        <>
          <NavAdmin />
          <div className="grid gap-8 p-4 lg:grid-cols-1 xl:grid-cols-2">
            <div className="grid-rows grid gap-4 xl:col-span-1 2xl:col-span-1">
              <ProfileCard url="/admin/dashboard-count" />
              <ManageCards role={role} />
            </div>
            <div className="xl:col-span-1 2xl:col-span-1">
              <OrderStatistic />
            </div>
          </div>
          <div className="mt-4 grid gap-8 p-4 lg:grid-cols-1 xl:grid-cols-3">
            <div className="lg:lg:col-span-1 xl:col-span-1">
              <MonthlyReportSection />
            </div>
            <div className="lg:col-span-1 xl:col-span-2">
              <SalesReportSection />
            </div>
          </div>
        </>
      )}
      {role === PHARMACIST_ROLE && (
        <>
          <NavPharmacist />
          <div className="grid gap-8 p-4 lg:grid-cols-1 xl:grid-cols-2">
            <div className="grid-rows grid gap-4 xl:col-span-1 2xl:col-span-1">
              <ProfileCard url="/pharmacist/dashboard-count" />
              <ManageCards role={role} />
            </div>
            <div className="xl:col-span-1 2xl:col-span-1">
              <OrderStatistic />
            </div>
          </div>
        </>
      )}
    </>
  );
}
