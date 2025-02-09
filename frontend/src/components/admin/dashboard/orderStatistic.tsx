import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const dataFetched = true;

const chartData = [
  { data: "pending", total: 1, fill: "var(--color-pending)" },
  { data: "processing", total: 1, fill: "var(--color-processing)" },
  { data: "shipped", total: 1, fill: "var(--color-shipped)" },
  { data: "delivered", total: 1, fill: "var(--color-delivered)" },
  { data: "completed", total: 1, fill: "var(--color-completed)" },
];
const chartConfig = {
  total: {
    label: "Total",
  },
  pending: {
    label: "pending",
    color: "hsl(var(--chart-1))",
  },
  processing: {
    label: "processing",
    color: "hsl(var(--chart-2))",
  },
  shipped: {
    label: "shipped",
    color: "hsl(var(--chart-3))",
  },
  delivered: {
    label: "delivered",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "completed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function OrderStatistic() {
  const currMonth = month[new Date().getMonth()];
  const currYear = new Date().getFullYear();

  const orderStatisticCard = {
    title: "Order Statistic",
    period: `${currMonth} ${currYear}`,
    footer: "Showing total orders this months",
  };

  const totalOrders = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);
  return (
    <Card className="relative flex max-h-[450px] flex-col text-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          {!dataFetched ? (
            <Skeleton className="h-8 w-[150px] rounded-xl" />
          ) : (
            orderStatisticCard.title
          )}
        </CardTitle>
        <CardDescription>
          {!dataFetched ? (
            <Skeleton className="h-4 w-[140px]" />
          ) : (
            orderStatisticCard.period
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!dataFetched ? (
          <Skeleton className="mx-auto my-6 aspect-video h-60 w-[300px] rounded-2xl" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-video max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel indicator="line" />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="data"
                innerRadius={60}
                strokeWidth={6}
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                      className="text-md fill-foreground"
                    >
                      {Number((payload.total / totalOrders) * 100).toFixed(2)}%
                    </text>
                  );
                }}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalOrders.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Orders
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="data" />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {!dataFetched ? (
          <>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
          </>
        ) : (
          <>
            <div className="leading-none text-muted-foreground">
              {orderStatisticCard.footer}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
