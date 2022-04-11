import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Card } from "../../components";
import { barChartData, barChartOptions } from "../../utils/charts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const BarChart = () => {
  const [chartData, setChartData] = useState<
    {
      name: string;
      data: number[];
    }[]
  >([]);
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>({});

  useEffect(() => {
    setChartData(barChartData);
    setChartOptions(barChartOptions);
  }, []);

  return (
    <Card
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Chart options={chartOptions} series={chartData} type="bar" width="100%" height="100%" />
    </Card>
  );
};
