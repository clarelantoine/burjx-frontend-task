import axios from "axios";
import { Coin, CoinPriceData } from "@/types/coin.interface";

const BASE_URL = "https://coingeko.burjx.com";

// service for fetching the coin ohlc endpoint with query productId and timeframe
export const fetchCoinOhlc = async (
  productID: number,
  timeframe: number | string,
): Promise<CoinPriceData[]> => {
  try {
    const { data } = await axios.get<CoinPriceData[]>(
      `${BASE_URL}/coin-ohlc?productId=${productID}&days=${timeframe}`,
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch OHLC data: ${error}`);
  }
};

// service for fetching the coin pages with query page number (keeping size 10 harcoded, but can refactor if need be)
export const fetchPaginatedCoins = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Coin[]> => {
  try {
    const { data } = await axios.get<{ data: Coin[] }>(
      `${BASE_URL}/coin-prices-all?currency=usd&page=${pageParam}&pageSize=10`,
    );
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch paginated coins: ${error}`);
  }
};

// service for fetching all coins
export const fetchAllCoins = async (): Promise<Coin[]> => {
  try {
    const { data } = await axios.get<{ data: Coin[] }>(
      `${BASE_URL}/coin-prices-all?currency=usd&page=1&pageSize=100`,
    );
    return data.data;
  } catch (error) {
    console.error("fetchAllCoins", error);
    throw new Error(`Failed to fetch all coins: ${error}`);
  }
};
