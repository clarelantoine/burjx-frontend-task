"use client";
import { Coin } from "@/types/coin.types";
import React, { useEffect, useState } from "react";
import CategoryItemCard from "./CategoryItemCard";

// type Props = {};

// async function fetchCoins(page: number): Promise<Coin[]> {
//   const res = await fetch(
//     `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=${page}&pageSize=10`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default function CoinCategorySection() {
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
      <h1 className="mb-6 text-[40px] capitalize">markets</h1>
      <div>
        <div className="mb-6 flex">
          <div className="border-green flex cursor-pointer gap-2 border-b px-5 py-2 text-xl">
            <span>🔥</span>
            <span>Featured</span>
          </div>
          <div className="flex cursor-pointer gap-2 border-b border-white/10 px-5 py-2 text-xl">
            <span>🚀</span>
            <span className="text-white/50">Top Gainers</span>
          </div>
          <div className="flex cursor-pointer gap-2 border-b border-white/10 px-5 py-2 text-xl">
            <span>🚨</span>
            <span className="text-white/50">Top Losers</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-hidden">
          {coins.map((coin) => (
            <CategoryItemCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </section>
  );
}
