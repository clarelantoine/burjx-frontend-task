// "use server";

import { Coin, CoinPriceData } from "@/types/coin.types";

export const getCoinProductID = async (coinId: string) => {
  try {
    const res = await fetch(
      "https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=100",
      {
        headers: {
          // Add headers that mimic a browser request from localhost
          Origin: "http://localhost:3000", // Use your actual port
          Referer: "http://localhost:3000/",
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      //   console.error(`Status: ${res.status}, StatusText: ${res.statusText}`);
      throw new Error("Failed to fetchTenCoins");
    }

    const { data } = await res.json();
    // console.log(data);

    const coins = data as Coin[];

    return coins.find((coin) => coin.id === coinId);
  } catch (error) {
    throw error;
  }
};

export const getCoinOhlcByProductID = async (productID: number) => {
  try {
    const res = await fetch(
      `https://coingeko.burjx.com/coin-ohlc?productId=${productID}&days=30`,
      // {
      //   headers: {
      //     // Add headers that mimic a browser request from localhost
      //     Origin: "http://localhost:3000", // Use your actual port
      //     Referer: "http://localhost:3000/",
      //   },
      //   next: { revalidate: 60 },
      // },
    );

    if (!res.ok) {
      //   console.error(`Status: ${res.status}, StatusText: ${res.statusText}`);
      throw new Error("Failed to fetchTenCoins");
    }

    const data = await res.json();
    console.log("data:", data);
    return data as CoinPriceData[];
    // const coins = data as Coin[];
  } catch (error) {
    throw error;
  }
};

export const fetchPaginatedCoins = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Coin[]> => {
  try {
    const res = await fetch(
      `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=${pageParam}&pageSize=10`,
      {
        headers: {
          // Add headers that mimic a browser request from localhost
          Origin: "http://localhost:3000", // Use your actual port
          Referer: "http://localhost:3000/",
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      //   console.error(`Status: ${res.status}, StatusText: ${res.statusText}`);
      throw new Error("Failed to fetchPaginatedCoins");
    }

    const { data } = await res.json();
    console.log("fetchPaginatedCoins");

    return data as Coin[];
  } catch (error) {
    throw error;
  }
};

export const fetchAllCoins = async (): Promise<Coin[]> => {
  try {
    const res = await fetch(
      "https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=100",
      {
        headers: {
          // Add headers that mimic a browser request from localhost
          Origin: "http://localhost:3000", // Use your actual port
          Referer: "http://localhost:3000/",
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      //   console.error(`Status: ${res.status}, StatusText: ${res.statusText}`);
      throw new Error("Failed to fetchTenCoins");
    }

    const { data } = await res.json();
    console.log("fetchAllCoins");

    return data as Coin[];
  } catch (error) {
    throw error;
  }
};
