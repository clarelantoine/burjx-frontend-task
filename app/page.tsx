import CoinCategorySection from "@/components/CoinCategorySection";
import CoinListSection from "@/components/CoinListSection";
import { Coin } from "@/types/coin.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchPaginatedCoins } from "./actions/coin.actions";

export default async function Home() {
  const queryClient = new QueryClient();

  try {
    // await queryClient.prefetchQuery<Coin[]>({
    //   queryKey: ["coins"],
    //   queryFn: fetchAllCoins,
    // });

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["coinList"],
      queryFn: ({ pageParam }) => fetchPaginatedCoins({ pageParam }), // passing pageParam
      initialPageParam: 1,
      getNextPageParam: (lastPage: Coin[], pages: Coin[][]) => {
        return lastPage.length === 10 ? pages.length + 1 : undefined;
      },
    });
  } catch (error) {
    throw error;
  }

  // const data = await fetchTenCoins();
  // console.log(data);

  return (
    <div className="flex flex-col gap-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CoinCategorySection />
        <CoinListSection />
      </HydrationBoundary>
    </div>
  );
}
