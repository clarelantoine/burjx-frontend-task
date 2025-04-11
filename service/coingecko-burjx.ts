// import { Coin } from "@/types/coin.types";
import { Coin } from "@/types/coin.types";
import axios from "axios";

export const fetchCoinData = async (): Promise<Coin[]> => {
  const { data } = await axios.get(
    `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=100`,
    // {
    //   headers: {
    //     Origin: typeof window !== 'undefined' ? window.location.origin : '',
    //     Referer: typeof window !== 'undefined' ? window.location.href : '',
    //   }
    // }
  );

  return data.data as Coin[];
};

// export const fetchTenCoins = async (): Promise<Coin[]> => {
//   const { data } = await axios.get(
//     `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=10`,
//     {
//       //   headers: {
//       //     Origin: typeof window !== 'undefined' ? window.location.origin : '',
//       //     Referer: typeof window !== 'undefined' ? window.location.href : '',
//       //   }
//       headers: {
//         // Add headers that mimic a browser request from localhost
//         Origin: "http://localhost:3000", // Use your actual port
//         Referer: "http://localhost:3000/",
//       },
//     },
//   );
//   return data.data as Coin[];
// };
