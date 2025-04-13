import axios from "axios";

import { Coin, CoinPriceData } from "@/types/coin.types";

export const getCoinOhlcByProductID = async (
  productID: number,
  timeframe: number | string,
) => {
  try {
    const { data: priceData }: { data: CoinPriceData[] } = await axios(
      `https://coingeko.burjx.com/coin-ohlc?productId=${productID}&days=${timeframe}`,
    );
    return priceData;
  } catch (error) {
    console.log("getCoinOhlcByProductID", error);
  }
};

export const fetchPaginatedCoins = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const { data } = await axios(
      `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=${pageParam}&pageSize=10`,
    );

    const coins: Coin[] = data.data;
    return coins;
  } catch (error) {
    console.log("fetchPaginatedCoins", error);
    throw error;
  }
};

export const fetchAllCoins = async () => {
  try {
    const { data } = await axios(
      "https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=100",
    );

    const coins: Coin[] = data.data;
    return coins;
  } catch (error) {
    console.log("fetchAllCoins", error);
    throw error;
  }
};

export const getCoinByID = async (coinId: string) => {
  const coins = await fetchAllCoins();
  return coins.find((coin) => coin.id === coinId);
};
