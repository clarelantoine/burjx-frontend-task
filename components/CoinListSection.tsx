"use client";

import { Coin } from "@/types/coin.types";
import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import CoinListRow from "./CoinListRow";

type Props = {};

export default function CoinListSection({}: Props) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=10",
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data } = await res.json();

        // console.log(data);

        setCoins(data);
      } catch (error) {
        if (error instanceof Error) setError("Failed to load coins.");
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1 className="mb-6 text-[40px] capitalize">all coins</h1>
      <div>
        <div className="flex items-center gap-10 px-5 py-3">
          {/* header */}
          <div className="flex-1 text-xs font-light text-white/50 capitalize">
            market name
          </div>
          <div className="flex flex-1 items-center gap-2 text-xs font-light text-white/50 capitalize">
            <span>market cap</span>
            <Info className="stroke-blue" width={15} height={15} />
          </div>
          <div className="flex flex-1 items-center gap-2 text-xs font-light text-white/50 capitalize">
            <span>trading volume</span>
            <Info className="stroke-blue" width={15} height={15} />
          </div>
          <div className="flex-1 text-xs font-light text-white/50 capitalize">
            24h chart
          </div>
          <div className="flex-1 text-xs font-light text-white/50 capitalize">
            price
          </div>
          <div className="flex-1 text-xs font-light text-white/50 capitalize">
            24h change
          </div>
        </div>

        {/* rows */}
        <div className="flex flex-col gap-1">
          {coins.map((coin) => (
            <CoinListRow key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </section>
  );
}
