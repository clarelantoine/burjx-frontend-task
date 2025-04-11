export interface Coin {
  productId: number;
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  sparkline: number[];
  marketCap: number;
  tradingVolume: number;
  symbol: string;
}

interface CurrencyPrice {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CoinPriceData {
  date: number;
  usd: CurrencyPrice;
  aed: CurrencyPrice;
}
