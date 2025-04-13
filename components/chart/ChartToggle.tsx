import { motion, LayoutGroup } from "framer-motion";

import clsx from "clsx";
import LineChartIcon from "../icons/LineChartIcon";
import CandleStickIcon from "../icons/CandleStickIcon";

export default function ChartToggle({
  isCandlestick,
  setIsCandlestick,
}: {
  isCandlestick: boolean;
  setIsCandlestick: (bool: boolean) => void;
}) {
  return (
    <LayoutGroup>
      <div className="relative flex h-9 w-20 items-center justify-between rounded-full border border-white/10 bg-white/5 p-1">
        {/* Sliding Toggle Effect */}
        <motion.div
          layoutId="toggle-chartype"
          className={clsx(
            "absolute z-0 h-7 w-9 rounded-full border-white/10",
            isCandlestick
              ? "to-green/30 bg-gradient-to-l from-transparent/10 via-transparent/70"
              : "to-green/30 bg-gradient-to-r from-transparent/10 via-transparent/70",
          )}
          initial={false}
          animate={{ x: isCandlestick ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* Candlestick Button */}
        <button
          onClick={() => setIsCandlestick(true)}
          className="relative z-10 flex flex-1 cursor-pointer items-center justify-center transition"
        >
          <CandleStickIcon />
        </button>

        {/* sparator */}
        <span className="text-white/10">|</span>

        {/* Line Chart Button */}
        <button
          onClick={() => setIsCandlestick(false)}
          className="relative z-10 flex flex-1 cursor-pointer items-center justify-center transition"
        >
          <LineChartIcon />
        </button>
      </div>
    </LayoutGroup>
  );
}
