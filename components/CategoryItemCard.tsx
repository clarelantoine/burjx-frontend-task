import { Coin } from "@/types/coin.types";
import Image from "next/image";
import React from "react";

type Props = {
  coin: Coin;
};

export default function CategoryItemCard({ coin }: Props) {
  return (
    <div className="bg-grey/30 flex h-[196px] w-[230px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 p-5">
      <div className="flex gap-3">
        <Image
          src={coin.image}
          alt={coin.name}
          sizes="100%"
          width={40}
          height={40}
          className="aspect-square rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-[16px] uppercase">{coin.symbol}</p>
          <p className="text-xs text-white/50">{coin.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p>{`$ ${coin.currentPrice}`}</p>
        {coin.priceChangePercentage24h > 0 ? (
          <p className="text-green rounded-lg bg-white/5 px-2 py-1 text-sm">
            {`+ ${coin.priceChangePercentage24h.toFixed(2)} %`}
          </p>
        ) : (
          <p className="text-red rounded-lg bg-white/5 px-2 py-1 text-sm">
            {`- ${coin.priceChangePercentage24h.toFixed(2)} %`}
          </p>
        )}
      </div>
    </div>
  );
}
