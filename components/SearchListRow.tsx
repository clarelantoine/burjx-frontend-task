import React from "react";
import CoinInfo from "./CoinInfo";
import { Coin } from "@/types/coin.types";
import { formatCurrencyCompact } from "@/utils/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import PricePercentageChangeBadge from "./PricePercentageChangeBadge";

type Props = {
  coin: Coin;
  coinIndex: number;
};

export default function SearchListRow({ coin, coinIndex }: Props) {
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
        <div className="flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-3 hover:bg-white/7">
          <CoinInfo name={coin.name} symbol={coin.symbol} image={coin.image} />

          <div className="flex flex-col items-end gap-1 text-sm">
            {`$ ${formatCurrencyCompact(coin.tradingVolume)}`}
            <PricePercentageChangeBadge
              value={coin.priceChangePercentage24h}
              variant="small"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
