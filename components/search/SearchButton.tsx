import { Coin } from "@/types/coin.interface";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

type Props = {
  coin: Coin;
  className?: string;
  variant?: "button" | "card" | "row";
  onClick: () => void;
};

export default function SearchButton({ coin, className, onClick }: Props) {
  const { image, symbol, name } = coin;
  return (
    <div
      className={clsx(
        "bg-grey/30 hover:bg-grey/10 flex w-fit cursor-pointer rounded-3xl border border-white/10 p-2 max-sm:p-2",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={symbol}
          sizes="100%"
          width={40}
          height={40}
          className="aspect-square shrink-0 rounded-full max-sm:w-8"
          priority
        />

        <p className="flex gap-1 text-sm">
          <span>{name}</span>
          <span className="uppercase">({symbol})</span>
        </p>

        <ChevronDown className="stroke-green" width={20} height={20} />
      </div>
    </div>
  );
}
