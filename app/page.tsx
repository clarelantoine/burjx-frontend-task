import CoinCategory from "@/components/coin/CoinCategory";
import CoinList from "@/components/coin/CoinList";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <CoinCategory />
      <CoinList />
    </div>
  );
}
