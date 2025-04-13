"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import CoinListHeader from "./CoinListHeader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { fetchPaginatedCoins } from "@/service/api/coingecko-burjx";

import Loader from "../shared/Loader";
import CoinListRow from "./CoinListRow";
import CoinListRowLoadingSkeleton from "./CoinListRowLoadingSkeleton";

export default function CoinList() {
  // ref for oberserver element
  const loaderRef = useRef<HTMLDivElement>(null);

  // infinite scrolling implementation
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  // intersection observer setup for end of page
  useInfiniteScroll({
    targetRef: loaderRef,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <section>
      <h1 className="mb-6 text-[40px] capitalize max-lg:text-3xl max-sm:text-2xl">
        all coins
      </h1>
      <div>
        <CoinListHeader />

        {/* rows */}
        <div className="mb-1 flex flex-col gap-1">
          {isLoading && <CoinListRowLoadingSkeleton />}
          {data?.pages.map((page) =>
            page.map((coin, coinIndex) => (
              <CoinListRow key={coin.id} coin={coin} coinIndex={coinIndex} />
            )),
          )}
        </div>

        <div ref={loaderRef} className="h-10" />

        {/* Show loading state if fetching next page */}
        {isFetchingNextPage && <Loader text="Loading more coins..." />}
      </div>
    </section>
  );
}
