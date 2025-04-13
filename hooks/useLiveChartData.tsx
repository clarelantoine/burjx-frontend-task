import { fetchCoinOhlc } from "@/service/api/coingecko-burjx";
import { apexCharOption, formattedCoinOhlcUSD } from "@/utils/apexchart.utils";
import { useQuery } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";

// query for getting coin ohlc
const useCoinOhlc = (productId: number, timeFrame: string | number) => {
  return useQuery({
    queryKey: ["ohlc", productId, timeFrame],
    queryFn: async () => {
      const coinOhlc = await fetchCoinOhlc(productId, timeFrame);
      if (coinOhlc) return formattedCoinOhlcUSD(coinOhlc);
    },
    enabled: !!productId,
  });
};

// Construct ApexChart options
const useChartOptions = (
  timeFrame: number | string,
  isCandlestick: boolean,
) => {
  // memozied the apex  chart option
  return useMemo(() => {
    // cancel animation for 1Y and All for performance
    const shouldDisableAnimation = timeFrame === 365 || timeFrame === "max";
    return apexCharOption(shouldDisableAnimation, isCandlestick) as ApexOptions;
  }, [timeFrame, isCandlestick]);
};

// hook for the live price chart
export const useLiveChartData = (productId: number | undefined) => {
  const [timeFrame, setTimeframe] = useState<number | string>(1);
  const [isCandlestick, setIsCandlestick] = useState(true);

  // get coin ohlc
  const { data: series, isLoading, error } = useCoinOhlc(productId!, timeFrame);

  // get apexchart options
  const chartOptions = useChartOptions(timeFrame, isCandlestick);

  return {
    timeFrame,
    setTimeframe,
    isCandlestick,
    setIsCandlestick,
    series,
    isLoading,
    error,
    chartOptions,
  };
};
