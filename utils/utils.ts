import { CoinPriceData } from "@/types/coin.types";

export function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)} trillion`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)} billion`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} million`;
  } else {
    return `${value.toFixed(2)}`;
  }
}

export function formatPriceWithCommas(value: number): string {
  const rounded = Math.round(value * 100) / 100;

  return `${
    Number.isInteger(rounded)
      ? rounded.toLocaleString()
      : rounded.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
  }`;
}

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
      curve: "smooth", // or "straight"
      width: 2, // 👈 this controls line thickness
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
