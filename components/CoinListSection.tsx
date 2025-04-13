"use client";

import CoinListRow from "./CoinListRow";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import CoinListHeader from "./CoinListHeader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchPaginatedCoins } from "@/service/api/coingecko-burjx";

export default function CoinListSection() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["coinList"],
      queryFn: ({ pageParam }) => fetchPaginatedCoins({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      // staleTime: 10000,
    });

  const loaderRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    targetRef: loaderRef,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  if (error) return <h2>{error.message}</h2>;

  return (
    <section>
      <h1 className="mb-6 text-[40px] capitalize">all coins</h1>
      <div>
        <CoinListHeader />

        {/* rows */}
        <div className="flex flex-col gap-1">
          {data?.pages.map((page) =>
            page.map((coin, coinIndex) => (
              <CoinListRow key={coin.id} coin={coin} coinIndex={coinIndex} />
            )),
          )}
        </div>

        <div ref={loaderRef} className="h-10" />

        {/* Show loading state if fetching next page */}
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  );
}
