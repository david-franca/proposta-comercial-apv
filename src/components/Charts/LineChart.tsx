import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { lineChartData, lineChartOptions } from "../../utils/charts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = () => {
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>(lineChartOptions);
  const [chartData, setChartData] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>(
    lineChartData
  );

  useEffect(() => {
    setChartData(lineChartData);
    setChartOptions(lineChartOptions);
  }, []);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
