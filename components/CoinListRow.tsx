import React from "react";
import SparklineChart from "./SparkLineChart";
import CoinInfo from "./CoinInfo";
import { Coin } from "@/types/coin.types";
import { formatCurrencyCompact, formatPriceWithCommas } from "@/utils/utils";
import Button from "./Button";
import Link from "next/link";
import { motion } from "framer-motion";
import PricePercentageChangeBadge from "./PricePercentageChangeBadge";

type Props = {
  coin: Coin;
  coinIndex: number;
};

export default function CoinListRow({ coin, coinIndex }: Props) {
  return (
    <motion.div
      key={coin.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
        delay: coinIndex * 0.05,
      }}
    >
      <Link href={`/coins/${coin.id}`}>
        <div className="bg-grey/30 hover:bg-grey/20 flex cursor-pointer items-center gap-10 rounded-3xl border border-white/10 p-5">
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
            <PricePercentageChangeBadge value={coin.priceChangePercentage24h} />
            <Button text="trade" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
