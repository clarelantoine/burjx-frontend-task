import React from "react";
import { Coin } from "@/types/coin.interface";
import {
  formatCurrencyCompact,
  formatPriceWithCommas,
} from "@/utils/coin.utils";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../shared/Button";
import PricePercentageChangeBadge from "../shared/PricePercentageChangeBadge";
import SparklineChart from "../chart/SparkLineChart";
import CoinInfo from "./CoinInfo";

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
        <div className="bg-grey/30 hover:bg-grey/10 flex cursor-pointer items-center gap-10 rounded-3xl border border-white/10 p-5 max-sm:justify-between">
          <CoinInfo
            name={coin.name}
            symbol={coin.symbol}
            image={coin.image}
            className="flex-1"
          />
          <div className="flex-1 max-lg:hidden max-sm:hidden">
            {`$ ${formatCurrencyCompact(coin.marketCap)}`}
          </div>
          <div className="flex-1 max-lg:hidden max-sm:hidden">
            {`$ ${formatCurrencyCompact(coin.tradingVolume)}`}
          </div>

          <SparklineChart
            data={coin.sparkline}
            isUp={coin.priceChangePercentage24h >= 0}
            className="flex-1 max-sm:hidden"
          />

          <div className="flex-1 max-sm:flex max-sm:justify-center max-sm:text-xs">{`$ ${formatPriceWithCommas(coin.currentPrice)}`}</div>

          <div className="flex flex-1 items-center justify-between max-sm:justify-end">
            <PricePercentageChangeBadge value={coin.priceChangePercentage24h} />
            <Button text="trade" className="max-sm:hidden" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
