import { CoinPriceData } from "@/types/coin.interface";

export const apexCharOption = (
  disableAnimation: boolean,
  isCandlestick: boolean,
) => {
  return {
    chart: {
      type: isCandlestick ? "candlestick" : "line",
      height: 230,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: !disableAnimation,
      },
      fontFamily: "var(--font-normal)",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#ededed"],
    title: {
      text: "",
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value: number) => `$ ${value.toLocaleString()}`,
        style: {
          colors: "rgba(255, 255, 255, 0.5)",
          fontSize: "12px",
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#cdff00", // Green (or whatever color you want)
          downward: "#ff3440", // Red (or any other)
        },
      },
    },
    grid: {
      show: true,
      borderColor: "rgba(255, 255, 255, 0.1)",
      strokeDashArray: 10,
      position: "back",
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        right: 15,
      },
    },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM yyyy HH:mm" },
      y: {
        style: {
          whiteSpace: "nowrap",
        },
      },
    },
  };
};

export const formattedCoinOhlcUSD = (
  data: CoinPriceData[],
): ApexAxisChartSeries => {
  return [
    {
      data: data.map((item) => ({
        x: new Date(item.date),
        y: [item.usd.open, item.usd.high, item.usd.low, item.usd.close],
      })),
    },
  ];
};
