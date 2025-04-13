import clsx from "clsx";

type Props = {
  value: number;
  variant?: "normal" | "small";
};

export default function PricePercentageChangeBadge({
  value,
  variant = "normal",
}: Props) {
  return value > 0 ? (
    <p
      className={clsx(
        "text-green h-fit w-fit rounded-lg bg-white/5",
        variant === "normal" ? "px-2 py-1 text-sm" : "px-1 py-0.5 text-xs",
      )}
    >
      {`+ ${value.toFixed(2)} %`}
    </p>
  ) : (
    <p
      className={clsx(
        "text-red h-fit w-fit rounded-lg bg-white/5",
        variant === "normal" ? "px-2 py-1 text-sm" : "px-1 py-0.5 text-xs",
      )}
    >
      {`- ${value.toFixed(2).replace("-", "")} %`}
    </p>
  );
}
