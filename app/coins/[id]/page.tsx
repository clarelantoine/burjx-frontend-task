"use client";

import { fetchAllCoins } from "@/app/actions/coin.actions";
import Modal from "@/components/Modal";
// import CategoryItemCard from "@/components/CategoryItemCard";
import { getCoinByID } from "@/service/api/coingecko-burjx";
import { Coin } from "@/types/coin.types";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchButton from "@/components/SearchButton";

const LivePriceChart = dynamic(() => import("@/components/LivePriceChart"), {
  ssr: false,
});

export default function CoinDetailPage() {
  const params = useParams();
  const { id } = params; // slug is dynamic

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAllCoins,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    // staleTime: 10000,
  });

  const selectCoin = data?.find((coin) => coin.id == id);

  const [coin, setCoin] = useState<Coin | undefined>();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const coinData = await getCoinByID(id as string);

      if (coinData) {
        setCoin(coinData);
      }
    };

    fetchCoinDetails();
  }, [id]);

  return (
    <div>
      {selectCoin && (
        <SearchButton coin={selectCoin} className="mb-6" onClick={openModal} />
      )}
      {coin && <LivePriceChart coin={coin} />}

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
