import moment from "moment";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Users } from "../../@types/interfaces";
import { Document } from "../../lib";
import { lineChartData, lineChartOptions } from "../../utils/charts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LineChartProps {
  users: Document<Users>[];
}

export const LineChart = ({ users }: LineChartProps) => {
  const lineOptions = useMemo(() => lineChartOptions, []);
  const [chartOptions, setChartOptions] = useState<ApexCharts.ApexOptions>(lineOptions);
  const [chartData, setChartData] = useState<ApexAxisChartSeries>(lineChartData);

  const createLineData = useCallback((usersArray: Document<Users>[]): ApexAxisChartSeries => {
    const series: ApexAxisChartSeries = [
      {
        name: "Essa Semana",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Semana Passada",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ];

    usersArray.forEach((user) => {
      switch (moment(user.createdAt).day()) {
        case 0:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[0] === "number") {
              series[0].data[0]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[0] === "number") {
              series[1].data[0]++;
            }
          }
          break;
        case 1:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[1] === "number") {
              series[0].data[1]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[1] === "number") {
              series[1].data[1]++;
            }
          }
          break;
        case 2:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[2] === "number") {
              series[0].data[2]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[2] === "number") {
              series[1].data[2]++;
            }
          }
          break;
        case 3:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[3] === "number") {
              series[0].data[3]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[3] === "number") {
              series[1].data[3]++;
            }
          }
          break;
        case 4:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[4] === "number") {
              series[0].data[4]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[4] === "number") {
              series[1].data[4]++;
            }
          }
          break;
        case 5:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[5] === "number") {
              series[0].data[5]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[5] === "number") {
              series[1].data[5]++;
            }
          }
          break;
        case 6:
          if (verify(user) === "thisWeek") {
            if (typeof series[0].data[6] === "number") {
              series[0].data[6]++;
            }
          }
          if (verify(user) === "lastWeek") {
            if (typeof series[1].data[6] === "number") {
              series[1].data[6]++;
            }
          }
          break;
        default:
          break;
      }
    });
    return series;
  }, []);

  const verify = (user: Users) => {
    const thisWeek = {
      start: moment().startOf("week"),
      end: moment().endOf("week"),
    };
    const lastWeek = {
      start: moment().startOf("week").subtract(7, "days"),
      end: moment().endOf("week").subtract(7, "days"),
    };

    if (moment(user.createdAt).isBetween(thisWeek.start, thisWeek.end)) {
      return "thisWeek";
    }
    if (moment(user.createdAt).isBetween(lastWeek.start, lastWeek.end)) {
      return "lastWeek";
    }
  };

  useEffect(() => {
    setChartOptions(lineChartOptions);
  }, []);

  useEffect(() => {
    const serie = createLineData(users);
    setChartData(serie);
  }, [createLineData, users]);

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
