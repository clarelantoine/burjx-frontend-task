// coin interface - Coin[] for array
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

// ohlc data typw
interface CurrencyPrice {
  open: number;
  high: number;
  low: number;
  close: number;
}

// coin ohlc data (USD/AED)
export interface CoinPriceData {
  date: number;
  usd: CurrencyPrice;
  aed: CurrencyPrice;
}
