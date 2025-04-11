import { Coin } from "@/types/coin.types";
import { useMemo } from "react";

export const useFilteredCoins = (
  coins: Coin[] | undefined,
  activeTab: string,
) => {
  const featured = useMemo(() => {
    return coins
      ? [...coins].sort((a, b) => b.marketCap - a.marketCap).slice(0, 20)
      : [];
  }, [coins]);

  const gainers = useMemo(() => {
    return coins
      ? [...coins]
          .sort(
            (a, b) =>
              (b.priceChangePercentage24h ?? 0) -
              (a.priceChangePercentage24h ?? 0),
          )
          .slice(0, 20)
      : [];
  }, [coins]);

  const losers = useMemo(() => {
    return coins
      ? [...coins]
          .sort(
            (a, b) =>
              (a.priceChangePercentage24h ?? 0) -
              (b.priceChangePercentage24h ?? 0),
          )
          .slice(0, 20)
      : [];
  }, [coins]);

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
