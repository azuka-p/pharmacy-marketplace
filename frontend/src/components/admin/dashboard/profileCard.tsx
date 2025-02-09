import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import { AdminDashboardCount } from "@/models/adminDashboard";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect } from "react";

interface ProfileCardProps {
  url: string;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { toast } = useToast();
  const {
    error: dashboardCountDataError,
    data: dashboardCountData,
    isLoading: dashboardCountIsLoading,
  } = useFetch<AdminDashboardCount>(props.url, {
    method: "GET",
  });

  const ProfileCardData = [
    {
      title: "Total Pharmacy",
      total: !isNaN(Number(dashboardCountData?.data.pharmacy))
        ? Number(dashboardCountData?.data.pharmacy)
        : 0,
    },
    {
      title: "Total Pharmacist",
      total: !isNaN(Number(dashboardCountData?.data.pharmacist))
        ? Number(dashboardCountData?.data.pharmacist)
        : 0,
    },
    {
      title: "Total User",
      total: !isNaN(Number(dashboardCountData?.data.user))
        ? Number(dashboardCountData?.data.user)
        : 0,
    },
  ];

  useEffect(() => {
    if (dashboardCountDataError != undefined) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: dashboardCountDataError.error[0].message,
        className: "my-2",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [dashboardCountDataError, toast]);

  return (
    <>
      <div className="row-span-1 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {ProfileCardData.map((item, key) => (
          <Card key={key}>
            <CardHeader className="text-gray-700">
              <CardTitle>
                {!dashboardCountIsLoading ? (
                  <span>{item.title}</span>
                ) : (
                  <Skeleton className="h-6 w-[150px]" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-gray-500">
                {!dashboardCountIsLoading ? (
                  <span>{item.total}</span>
                ) : (
                  <Skeleton className="h-8 w-[100px] rounded-xl" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
