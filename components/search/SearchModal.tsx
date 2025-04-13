"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SearchListRow from "./SearchListRow";
import { fetchAllCoins } from "@/service/api/coingecko-burjx";
import { useState } from "react";
import { Coin } from "@/types/coin.interface";

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// backdrop animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function SearchModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
}) {
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAllCoins,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    // staleTime: 10000,
  });

  const filteredCoins: Coin[] = data
    ? data.filter((coin: Coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];
  if (!isOpen) return null;

  return (
    <div>
      {/* Backdrop */}
      <motion.div
        className="bg-background/95 fixed top-0 right-0 bottom-0 left-0 z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={() => setIsModalOpen(!isOpen)}
      />

      {/* Modal */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-50 h-[80vh] min-w-[calc(100vw/3)] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border border-white/10 bg-[#171717] px-9 py-8 shadow-lg max-sm:h-[70vh] max-sm:min-w-[calc(80vw)] max-sm:px-4 max-sm:py-5"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
      >
        {/* Modal content */}
        <div className="flex h-full flex-col gap-6 max-sm:gap-4">
          <h1 className="text-3xl capitalize max-sm:text-2xl">Search crypto</h1>

          {/* Search input */}
          <input
            type="text"
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white/80 outline-none max-sm:text-sm"
            placeholder="Search coin"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <p className="text-sm text-white/50">All coins</p>

          {/* Search list */}
          <div className="flex flex-1 flex-col gap-1 overflow-auto">
            {filteredCoins &&
              filteredCoins.map((coin, coinIndex) => (
                <SearchListRow
                  key={coin.id}
                  coin={coin}
                  coinIndex={coinIndex}
                />
              ))}
          </div>

          {/* Close button */}
          <button
            className="bg-green text-background hover:bg-background hover:text-foreground absolute -top-1.5 -right-1.5 flex aspect-square w-8 items-center justify-center rounded-full leading-0 transition"
            onClick={() => setIsModalOpen(!isOpen)}
          >
            X
          </button>
        </div>
      </motion.div>
    </div>
  );
}
