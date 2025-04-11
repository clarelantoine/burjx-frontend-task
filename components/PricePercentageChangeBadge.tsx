type Props = {
  value: number;
};

export default function PricePercentageChangeBadge({ value }: Props) {
  return value > 0 ? (
    <p className="text-green h-fit w-fit rounded-lg bg-white/5 px-2 py-1 text-sm">
      {`+ ${value.toFixed(2)} %`}
    </p>
  ) : (
    <p className="text-red h-fit w-fit rounded-lg bg-white/5 px-2 py-1 text-sm">
      {`- ${value.toFixed(2).replace("-", "")} %`}
    </p>
  );
}
