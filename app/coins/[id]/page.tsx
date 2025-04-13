"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { useQuery } from "@tanstack/react-query";

import { ArrowLeft } from "lucide-react";

import SearchModal from "@/components/search/SearchModal";
import SearchButton from "@/components/search/SearchButton";
import { fetchAllCoins } from "@/service/api/coingecko-burjx";

const LivePriceChart = dynamic(
  () => import("@/components/chart/LivePriceChart"),
  {
    ssr: false,
  },
);

export default function CoinDetailPage() {
  const params = useParams();
  const { id } = params;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAllCoins,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    // staleTime: 10000,
  });

  const coin = data?.find((coin) => coin.id == id);

  if (!coin) return;

  return (
    <div className="mt-10 max-sm:mt-5">
      <div className="mb-5 flex items-center gap-5 max-sm:gap-2">
        <Link href="/">
          <button className="bg-grey/30 hover:bg-grey/10 rounded-full border border-white/10 p-3 max-sm:p-3">
            <ArrowLeft className="stroke-white/50" width={20} height={20} />
          </button>
        </Link>

        <SearchButton
          coin={coin}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
      <LivePriceChart coin={coin} />

      <SearchModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
