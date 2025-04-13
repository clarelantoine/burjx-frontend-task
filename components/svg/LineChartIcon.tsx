import clsx from "clsx";

type Props = {
  className?: string;
};

export default function LineChartIcon({ className }: Props) {
  return (
    <svg className={clsx(className ? className : "h-2.5 w-[15px]")}>
      <path className="stroke-white stroke-1" d="m.7 8.7 5.2-6 2.9 4 5.2-6" />
    </svg>
  );
}
