import { Coin } from "@/types/coin.interface";
import { useMemo } from "react";

export const useFilteredCoins = (
  coins: Coin[] | undefined,
  activeTab: string,
) => {
  // filter top 20 coins by market cap
  const featured = useMemo(() => {
    return coins
      ? [...coins].sort((a, b) => b.marketCap - a.marketCap).slice(0, 20)
      : [];
  }, [coins]);

  // filter top gainer 20 coins by 24hour % change
  const gainers = useMemo(() => {
    return coins
      ? [...coins]
          .sort(
            (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h,
          )
          .slice(0, 20)
      : [];
  }, [coins]);

  //  filter top looser 20 coins by 24hour % change
  const losers = useMemo(() => {
    return coins
      ? [...coins]
          .sort(
            (a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h,
          )
          .slice(0, 20)
      : [];
  }, [coins]);

  // memoize the filtered function for performance
  return useMemo(() => {
    switch (activeTab) {
      case "featured":
        return featured;
      case "gainers":
        return gainers;
      case "losers":
        return losers;
      default:
        return [];
    }
  }, [activeTab, featured, gainers, losers]);
};
