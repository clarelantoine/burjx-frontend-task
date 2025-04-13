"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useFilteredCoins } from "@/hooks/useFilteredCoins";
import CoinCategoryTab from "./CoinCategoryTab";

import { fetchAllCoins } from "@/service/api/coingecko-burjx";
import CoinCard from "./CoinCard";
import { tabs } from "@/constants";
import CoinCategoryLoadingSkeleton from "./CoinCategoryLoadingSkeleton";

export default function CoinCategory() {
  const [activeTab, setActiveTab] = useState("featured");

  const { data, error, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAllCoins,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    // staleTime: 10000,
  });

  const filteredData = useFilteredCoins(data, activeTab);

  if (error) return <h2 className="text-red-500">{error.message}</h2>;

  return (
    <section>
      <h1 className="mb-6 text-[40px] capitalize max-lg:text-3xl max-sm:text-2xl">
        markets
      </h1>
      <div>
        <motion.div layout className="mb-6 flex">
          {tabs.map((tab) => (
            <CoinCategoryTab
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="scrollbar-hide flex snap-x snap-mandatory gap-1 overflow-x-auto"
          >
            {isLoading && <CoinCategoryLoadingSkeleton />}
            {filteredData &&
              filteredData.map((coin) => (
                <div key={coin.id} className="shrink-0 snap-start">
                  <CoinCard coin={coin} />
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
