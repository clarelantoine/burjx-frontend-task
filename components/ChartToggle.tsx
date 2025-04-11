import { useState } from "react";
import { motion } from "framer-motion";

export default function ChartToggle() {
  const [isCandlestick, setIsCandlestick] = useState(true);

  return (
    <div className="relative flex h-9 w-22 justify-between overflow-hidden rounded-3xl border border-white/10 p-0.5">
      {/* Background Glow Effect */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="bg-green/10 absolute top-1 left-1 z-0 h-[50%] w-[50%] rounded-full blur-md"
        style={{ x: isCandlestick ? 0 : 64 }}
      />

      {/* Toggle Button - Candlestick */}
      <motion.button
        onClick={() => setIsCandlestick(true)}
        className="relative z-10 flex flex-1 items-center justify-center rounded-4xl border border-white/10 transition-all"
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex gap-1">
          <div className="relative h-3 w-0.5 rounded-sm bg-lime-400">
            <div className="absolute top-0 left-1/2 h-2 w-0.5 -translate-x-1/2 bg-lime-400"></div>
          </div>
          <div className="relative h-3 w-0.5 rounded-sm bg-red-500">
            <div className="absolute top-0 left-1/2 h-2 w-0.5 -translate-x-1/2 bg-red-500"></div>
          </div>
        </div>
      </motion.button>

      {/* Toggle Button - Line Chart */}
      <motion.button
        onClick={() => setIsCandlestick(false)}
        className="relative z-10 flex flex-1 items-center justify-center rounded-full transition-all"
        whileTap={{ scale: 0.9 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isCandlestick ? 0.6 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="4 14 8 10 12 14 16 10 20 14" />
        </motion.svg>
      </motion.button>
    </div>
  );
}
