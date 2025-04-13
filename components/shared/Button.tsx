import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
};

export default function Button({ text, className }: Props) {
  return (
    <button
      className={clsx(
        "bg-green text-background rounded-3xl px-5 py-2 text-sm font-semibold capitalize",
        className,
      )}
    >
      {text}
    </button>
  );
}
