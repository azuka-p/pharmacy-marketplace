import { XAxis } from "recharts";

import { Bar, BarChart, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const dataFetched = true;

const MonthlyReportSectionCard = {
  title: "Monthly Report",
  description: "January - June 2024",
  footer: "Showing sales report for the last 6 months",
};

export function MonthlyReportSection() {
  const chartData = [
    { month: "January", data: 1 },
    { month: "February", data: 1 },
    { month: "March", data: 1 },
    { month: "April", data: 1 },
    { month: "May", data: 1 },
    { month: "June", data: 1 },
  ];
  const chartConfig = {
    data: {
      label: "Data",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="relative h-full">
      <div className="absolute right-4 top-4 text-lg hover:cursor-pointer hover:text-[#1A86C6]">
        <a href="#">View Details</a>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">
          {!dataFetched ? (
            <Skeleton className="h-6 w-[150px] rounded-xl" />
          ) : (
            MonthlyReportSectionCard.title
          )}
        </CardTitle>
        <CardDescription>
          {!dataFetched ? (
            <Skeleton className="h-6 w-[175px] rounded-xl" />
          ) : (
            MonthlyReportSectionCard.description
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!dataFetched ? (
          <Skeleton className="aspect-video h-[340px] w-full rounded-xl" />
        ) : (
          <ChartContainer config={chartConfig} className="h-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="data" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="data" fill="var(--color-data)" radius={5} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none"></div>
        <div className="leading-none text-muted-foreground">
          {!dataFetched ? (
            <Skeleton className="h-6 w-[300px] rounded-xl" />
          ) : (
            MonthlyReportSectionCard.footer
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
