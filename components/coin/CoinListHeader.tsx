import clsx from "clsx";
import { Info } from "lucide-react";

const ListHeader = [
  {
    text: "market name",
  },
  {
    text: "market cap",
    icon: <Info className="stroke-blue" width={15} height={15} />,
    className: "max-sm:hidden max-lg:hidden",
  },
  {
    text: "trading volume",
    icon: <Info className="stroke-blue" width={15} height={15} />,
    className: "max-sm:hidden max-lg:hidden",
  },
  {
    text: "24h chart",
    className: "max-sm:hidden",
  },
  {
    text: "price",
    className: "max-sm:justify-center",
  },
  {
    text: "24h change",
    className: "max-sm:justify-end",
  },
];

export default function CoinListHeader() {
  return (
    <div className="bg-background sticky top-0 z-10 flex items-center gap-10 px-5 py-3">
      {ListHeader.map((item) => (
        <div
          key={item.text}
          className={clsx(
            "flex flex-1 items-center gap-2 text-xs font-light text-white/50 capitalize",
            item?.className,
          )}
        >
          <span>{item.text}</span>
          {item.icon}
        </div>
      ))}
    </div>
  );
}
