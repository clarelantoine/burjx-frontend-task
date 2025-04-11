import clsx from "clsx";
import { motion } from "framer-motion";

type Tab = {
  id: string;
  label: string;
  icon?: string;
};

type Props = {
  tab: Tab;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
};

export default function CoinCategoryTab({
  tab,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <motion.div
      role="tab"
      onClick={() => setActiveTab(tab.id)}
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      className={clsx(
        "relative flex cursor-pointer items-center gap-2 px-5 py-2 text-xl transition-colors duration-200",
        activeTab === tab.id ? "text-white" : "text-white/50",
      )}
    >
      <span>{tab.icon}</span>
      <span>{tab.label}</span>

      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10" />

      {/* Animated underline */}
      {activeTab === tab.id && (
        <motion.div
          layoutId="tab-underline"
          className="bg-green absolute bottom-0 left-0 h-[1px] w-full"
        />
      )}
    </motion.div>
  );
}
