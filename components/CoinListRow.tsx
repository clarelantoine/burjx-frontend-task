import React from "react";
import SparklineChart from "./SparkLineChart";
import CoinInfo from "./CoinInfo";
import { Coin } from "@/types/coin.types";
import { formatCurrencyCompact, formatPriceWithCommas } from "@/utils/utils";
import Button from "./Button";
import Link from "next/link";

type Props = {
  coin: Coin;
};

export default function CoinListRow({ coin }: Props) {
  return (
    <Link href={`/coins/${coin.name.toLowerCase()}`}>
      <div className="bg-grey/30 flex items-center gap-10 rounded-3xl border border-white/10 p-5">
        <CoinInfo
          name={coin.name}
          symbol={coin.symbol}
          image={coin.image}
          className="flex-1"
        />
        <div className="flex-1">
          {`$ ${formatCurrencyCompact(coin.marketCap)}`}
        </div>
        <div className="flex-1">
          {`$ ${formatCurrencyCompact(coin.tradingVolume)}`}
        </div>

        <SparklineChart
          data={coin.sparkline}
          isUp={coin.priceChangePercentage24h >= 0}
          className="flex-1"
        />

        <div className="flex-1">{`$ ${formatPriceWithCommas(coin.currentPrice)}`}</div>
        <div className="flex flex-1 items-center justify-between">
          {coin.priceChangePercentage24h > 0 ? (
            <p className="text-green h-fit w-fit rounded-lg bg-white/5 px-2 py-1 text-sm">
              {`+ ${coin.priceChangePercentage24h.toFixed(2)} %`}
            </p>
          ) : (
            <p className="text-red h-fit w-fit rounded-lg bg-white/5 px-2 py-1 text-sm">
              {`- ${coin.priceChangePercentage24h.toFixed(2).replace("-", "")} %`}
            </p>
          )}

          <Button text="trade" />
        </div>
      </div>
    </Link>
  );
}
