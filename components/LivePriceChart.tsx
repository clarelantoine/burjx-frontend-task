import { useMemo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Coin } from "@/types/coin.types";
import { getCoinOhlcByProductID } from "@/service/api/coingecko-burjx";
import { apexCharOption, formattedCoinOhlcUSD } from "@/utils/utils";
import PricePercentageChangeBadge from "./PricePercentageChangeBadge";
import ChartToggle from "./ChartToggle";
import clsx from "clsx";

const timeFrameButtons = [
  { id: "day", value: 1, label: "1d" },
  { id: "week", value: 7, label: "1w" },
  { id: "month", value: 30, label: "1m" },
  { id: "year", value: 365, label: "1y" },
  { id: "all", value: "max", label: "All" },
];

const useChartOptions = (
  timeFrame: number | string,
  isCandlestick: boolean,
) => {
  return useMemo(() => {
    const shouldDisableAnimation = timeFrame === 365 || timeFrame === "max";
    return apexCharOption(shouldDisableAnimation, isCandlestick) as ApexOptions;
  }, [timeFrame, isCandlestick]);
};

const useSeriesData = (coin: Coin, timeFrame: number | string) => {
  const [series, setSeries] = useState<ApexAxisChartSeries | []>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchAndSetSeries = async () => {
      setLoading(true); // Start loading
      try {
        const coinOhlc = await getCoinOhlcByProductID(
          coin.productId,
          timeFrame,
        );
        if (coinOhlc) {
          const formattedSeries = formattedCoinOhlcUSD(coinOhlc);
          setSeries(formattedSeries);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchAndSetSeries();
  }, [coin, timeFrame]);

  return { series, loading }; // Return loading state along with series data
};

export default function LivePriceChart({ coin }: { coin: Coin }) {
  const [timeFrame, setTimeframe] = useState<number | string>(1);
  const [isCandlestick, setIsCandlestick] = useState(true);

  const chartOptions = useChartOptions(timeFrame, isCandlestick); // Memoized chart options
  const { series, loading } = useSeriesData(coin, timeFrame); // Memoized series data with loading state

  return (
    <div className="bg-grey/30 flex flex-col gap-3 rounded-3xl border border-white/10 px-9 py-8">
      <div className="px-3">
        <div className="mb-2 flex items-center gap-5">
          <p className="text-3xl">{`$ 148,385.52`}</p>
          <ChartToggle
            setIsCandlestick={setIsCandlestick}
            isCandlestick={isCandlestick}
          />
        </div>
        <PricePercentageChangeBadge value={5.48} />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex h-[350px] items-center justify-center">
          <div className="spinner-border inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <ReactApexChart
          key={isCandlestick ? "candlestick" : "line"}
          options={chartOptions}
          series={series}
          type={isCandlestick ? "candlestick" : "line"}
          height={350}
        />
      )}

      <div className="flex gap-4 px-3 text-xs text-white/50 capitalize">
        {timeFrameButtons.map((button) => (
          <button
            key={button.id}
            className={clsx(
              "cursor-pointer rounded-md px-2.5 py-2 leading-none uppercase",
              timeFrame === button.value
                ? "bg-green border-green text-background border"
                : "hover:bg-grey",
            )}
            onClick={() => setTimeframe(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
