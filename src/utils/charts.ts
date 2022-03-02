import ptBr from "apexcharts/dist/locales/pt-br.json";

export const barChartData = [
  {
    name: "Sales",
    data: [0, 2, 12],
  },
];

export const barChartOptions: ApexCharts.ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    locales: [ptBr],
    defaultLocale: "pt-br",
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },

    theme: "dark",
  },
  xaxis: {
    categories: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    labels: {
      show: false,
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
};

export const lineChartData: ApexAxisChartSeries | ApexNonAxisChartSeries = [
  {
    name: "Mobile apps",
    data: [
      { x: new Date("2021-01-15"), y: 1 },
      { x: new Date("2021-02-15"), y: 2 },
      { x: new Date("2021-03-15"), y: 4 },
      { x: new Date("2021-04-15"), y: 8 },
      { x: new Date("2021-05-15"), y: 5 },
      { x: new Date("2021-06-15"), y: 9 },
      { x: new Date("2021-07-15"), y: 3 },
      { x: new Date("2021-08-15"), y: 2 },
      { x: new Date("2021-09-15"), y: 10 },
      { x: new Date("2021-10-15"), y: 9 },
    ],
  },
  {
    name: "Websites",
    data: [
      { x: new Date("2021-01-15"), y: 6 },
      { x: new Date("2021-02-15"), y: 2 },
      { x: new Date("2021-03-15"), y: 8 },
      { x: new Date("2021-04-15"), y: 4 },
      { x: new Date("2021-05-15"), y: 3 },
      { x: new Date("2021-06-15"), y: 12 },
      { x: new Date("2021-07-15"), y: 9 },
      { x: new Date("2021-08-15"), y: 5 },
      { x: new Date("2021-09-15"), y: 10 },
      { x: new Date("2021-10-15"), y: 4 },
    ],
  },
];

export const lineChartOptions: ApexCharts.ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    defaultLocale: "pt-br",
    locales: [ptBr],
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "MMMM",
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#4FD1C5", "#2D3748"],
  },
  colors: ["#4FD1C5", "#2D3748"],
};
