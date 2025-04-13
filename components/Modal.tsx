"use client";
import { fetchAllCoins } from "@/app/actions/coin.actions";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SearchListRow from "./SearchListRow";

const Modal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  // Animation variants for modal and backdrop
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const { data } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchAllCoins,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    // staleTime: 10000,
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="bg-background/95 fixed top-0 right-0 bottom-0 left-0 z-50"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={closeModal}
      />

      {/* Modal */}
      <motion.div
        className="bg-grey fixed top-1/2 left-1/2 z-50 h-[90vh] min-w-[calc(100vw/3)] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border border-white/10 px-9 py-8 shadow-lg"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modalVariants}
      >
        {/* Make the modal content a full-height flex column */}
        <div className="flex h-full flex-col gap-6">
          <h1 className="text-3xl capitalize">Search crypto</h1>

          <input
            type="text"
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white/80 outline-none"
            placeholder="Search coin"
          />

          <p className="text-sm text-white/50">All coins</p>

          {/* Scrollable list that takes remaining height */}
          <div className="flex flex-1 flex-col gap-1 overflow-auto">
            {data &&
              data.map((coin, coinIndex) => (
                <SearchListRow
                  key={coin.id}
                  coin={coin}
                  coinIndex={coinIndex}
                />
              ))}
          </div>

          {/* Close button */}
          <button
            className="bg-green text-background hover:bg-background hover:text-foreground absolute -top-1.5 -right-1.5 flex aspect-square w-8 items-center justify-center rounded-full leading-0 transition"
            onClick={closeModal}
          >
            X
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
