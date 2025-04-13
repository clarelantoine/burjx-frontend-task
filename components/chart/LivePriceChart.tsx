import ReactApexChart from "react-apexcharts";
import { Coin } from "@/types/coin.interface";
import PricePercentageChangeBadge from "../shared/PricePercentageChangeBadge";
import ChartToggle from "./ChartToggle";
import clsx from "clsx";
import Loader from "../shared/Loader";
import { useLiveChartData } from "@/hooks/useLiveChartData";
import { timeFrameButtons } from "@/constants";

export default function LivePriceChart({ coin }: { coin: Coin }) {
  const {
    timeFrame,
    setTimeframe,
    isCandlestick,
    setIsCandlestick,
    series,
    isLoading,
    error,
    chartOptions,
  } = useLiveChartData(coin?.productId);

  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="bg-grey/30 flex flex-col gap-3 rounded-3xl border border-white/10 px-9 py-8 max-sm:p-3">
      <div className="px-3">
        <div className="mb-2 flex items-center gap-5">
          <p className="text-3xl max-sm:text-2xl">{`$ 148,385.52`}</p>
          <ChartToggle
            setIsCandlestick={setIsCandlestick}
            isCandlestick={isCandlestick}
          />
        </div>
        <PricePercentageChangeBadge value={5.48} />
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex h-[350px] items-center justify-center">
          <Loader text="Loading chart..." />
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

      <div className="flex gap-4 px-3 text-xs text-white/50 capitalize max-sm:gap-1">
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
