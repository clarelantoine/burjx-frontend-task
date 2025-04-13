import { motion } from "framer-motion";
export default function CoinCategoryLoadingSkeleton() {
  return Array.from({ length: 6 }).map((i, index) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
      }}
      key={index}
      className="bg-grey/30 flex h-[196px] w-[230px] shrink-0 animate-pulse flex-col justify-between rounded-3xl border border-white/10 p-5"
    >
      {/* CoinInfo skeleton */}
      <div className="flex items-center space-x-3">
        <div className="bg-grey/50 h-10 w-10 rounded-full" />
        <div className="flex flex-col space-y-1">
          <div className="bg-grey/50 h-3 w-16 rounded" />
          <div className="bg-grey/50 h-3 w-10 rounded" />
        </div>
      </div>

      {/* SparklineChart skeleton */}
      <div className="bg-grey/50 h-14 w-full rounded" />

      {/* price skeleton */}
      <div className="flex items-center justify-between">
        <div className="bg-grey/50 h-4 w-16 rounded" />
        <div className="bg-grey/50 h-6 w-12 rounded-full" />
      </div>
    </motion.div>
  ));
}
