import clsx from "clsx";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
  symbol: string;
  className?: string;
  variant?: "button" | "card" | "row";
};

export default function CoinInfo({ image, name, symbol, className }: Props) {
  return (
    <div className={clsx("", className)}>
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={symbol}
          sizes="100%"
          width={40}
          height={40}
          className="aspect-square shrink-0 rounded-full"
          priority
        />
        <div className="flex flex-col justify-between">
          <p className="text-[16px] uppercase">{symbol}</p>
          <p className="text-xs font-light text-white/50">{name}</p>
        </div>
      </div>
    </div>
  );
}
