import { Coin } from "@/types/coin.interface";
import { formatPriceWithCommas } from "@/utils/coin.utils";
import React from "react";
import SparklineChart from "../chart/SparkLineChart";
import CoinInfo from "./CoinInfo";
import PricePercentageChangeBadge from "../shared/PricePercentageChangeBadge";
import Link from "next/link";

type Props = {
  coin: Coin;
};

export default function CoinCard({ coin }: Props) {
  return (
    <Link href={`/coins/${coin.id}`}>
      <div className="bg-grey/30 hover:bg-grey/10 flex h-[196px] w-[230px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 p-5">
        <CoinInfo name={coin.name} symbol={coin.symbol} image={coin.image} />
        <SparklineChart
          data={coin.sparkline}
          isUp={coin.priceChangePercentage24h >= 0}
        />
        <div className="flex items-center justify-between">
          <p>{`$ ${formatPriceWithCommas(coin.currentPrice)}`}</p>
          <PricePercentageChangeBadge value={coin.priceChangePercentage24h} />
        </div>
      </div>
    </Link>
  );
}
