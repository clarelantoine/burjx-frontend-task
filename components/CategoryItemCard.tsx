import { Coin } from "@/types/coin.types";
import { formatPriceWithCommas } from "@/utils/utils";
import React from "react";
import SparklineChart from "./SparkLineChart";
import CoinInfo from "./CoinInfo";

type Props = {
  coin: Coin;
};

export default function CategoryItemCard({ coin }: Props) {
  return (
    <div className="bg-grey/30 flex h-[196px] w-[230px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 p-5">
      <CoinInfo name={coin.name} symbol={coin.symbol} image={coin.image} />
      <SparklineChart
        data={coin.sparkline}
        isUp={coin.priceChangePercentage24h >= 0}
      />
      <div className="flex items-center justify-between">
        <p>{`$ ${formatPriceWithCommas(coin.currentPrice)}`}</p>
        {coin.priceChangePercentage24h > 0 ? (
          <p className="text-green rounded-lg bg-white/5 px-2 py-1 text-sm">
            {`+ ${coin.priceChangePercentage24h.toFixed(2)} %`}
          </p>
        ) : (
          <p className="text-red rounded-lg bg-white/5 px-2 py-1 text-sm">
            {`- ${coin.priceChangePercentage24h.toFixed(2).replace("-", "")} %`}
          </p>
        )}
      </div>
    </div>
  );
}
