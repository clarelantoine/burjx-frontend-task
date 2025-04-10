import CoinCategorySection from "@/components/CoinCategorySection";
import CoinListSection from "@/components/CoinListSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <CoinCategorySection />
      <CoinListSection />
    </div>
  );
}
