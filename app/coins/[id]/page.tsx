// import { getCoinByID } from "@/app/actions/coin.actions";

import {
  // getCoinOhlcByProductID,
  getCoinProductID,
} from "@/app/actions/coin.actions";
import CategoryItemCard from "@/components/CategoryItemCard";
import LivePriceChart from "@/components/LivePriceChart";

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const coin = await getCoinProductID(id);
  if (!coin) return <p>Error</p>;

  // const coinPriceData = await getCoinOhlcByProductID(coin.productId);
  // console.log(result);

  return (
    <div>
      <CategoryItemCard coin={coin} />
      <LivePriceChart />
    </div>
  );
}
