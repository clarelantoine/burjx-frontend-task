import { motion } from "framer-motion";
export default function CoinListRowLoadingSkeleton() {
  return Array.from({ length: 6 }).map((i, index) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
      }}
      key={index}
      className="bg-grey/30 flex animate-pulse cursor-pointer items-center gap-10 rounded-3xl border border-white/10 p-5 max-sm:justify-between"
    >
      {/* CoinInfo Skeleton */}
      <div className="flex flex-1 items-center gap-3">
        <div className="bg-grey/50 h-10 w-10 rounded-full" />
        <div className="flex flex-col space-y-1">
          <div className="bg-grey/50 h-3 w-20 rounded" />
          <div className="bg-grey/50 h-3 w-12 rounded" />
        </div>
      </div>

      {/* Market Cap Skeleton */}
      <div className="flex-1 max-lg:hidden max-sm:hidden">
        <div className="bg-grey/50 h-3 w-24 rounded" />
      </div>

      {/* Trading Volume Skeleton */}
      <div className="flex-1 max-lg:hidden max-sm:hidden">
        <div className="bg-grey/50 h-3 w-24 rounded" />
      </div>

      {/* SparklineChart Skeleton */}
      <div className="bg-grey/50 h-10 flex-1 rounded max-sm:hidden" />

      {/* Price Skeleton */}
      <div className="flex-1 max-sm:flex max-sm:justify-center max-sm:text-xs">
        <div className="bg-grey/50 h-3 w-16 rounded" />
      </div>

      <div className="flex flex-1 items-center justify-between gap-2 max-sm:justify-end">
        <div className="bg-grey/50 h-6 w-14 rounded-full" />
        <div className="bg-grey/50 h-8 w-16 rounded-2xl max-sm:hidden" />
      </div>
    </motion.div>
  ));
}
