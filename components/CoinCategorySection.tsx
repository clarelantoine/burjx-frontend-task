"use client";
// import { fetchAllCoins } from "@/app/actions/coin.actions";
import CategoryItemCard from "./CategoryItemCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFilteredCoins } from "@/hooks/useFilteredCoins";
import CoinCategoryTab from "./CoinCategoryTab";
import { tabs } from "@/data";
import { fetchAllCoins } from "@/service/api/coingecko-burjx";
// import { fetchAllCoins } from "@/app/actions/coin.actions";

export default function CoinCategorySection() {
  const [activeTab, setActiveTab] = useState("featured");

  const { data, error } = useQuery({
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
      <h1 className="mb-6 text-[40px] capitalize">markets</h1>
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

        {/* animated cards*/}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="scrollbar-hide flex snap-x snap-mandatory gap-1 overflow-x-auto"
          >
            {filteredData &&
              filteredData.map((coin) => (
                <div key={coin.id} className="w-60 shrink-0 snap-start">
                  <CategoryItemCard coin={coin} />
                </div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* unanimated cards */}
        {/* <div key={activeTab} className="flex gap-1 overflow-x-auto">
          {filteredData &&
            filteredData.map((coin) => (
              <CategoryItemCard key={coin.id} coin={coin} />
            ))}
        </div> */}
      </div>
    </section>
  );
}
