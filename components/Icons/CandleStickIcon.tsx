import clsx from "clsx";

type Props = {
  className?: string;
};

export default function CandleStickIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className ? className : "h-3.5 w-3")}
    >
      <path
        fillRule="evenodd"
        d="M2.4.9c.2 0 .4.2.4.4v1.6h.4c1 0 1.6.7 1.6 1.6v4c0 1-.7 1.6-1.6 1.6h-.4v4a.4.4 0 0 1-.8 0v-4h-.4C.7 10.1 0 9.4 0 8.5v-4c0-.9.7-1.6 1.6-1.6H2V1.3c0-.2.2-.4.4-.4Z"
        clipRule="evenodd"
        className="fill-green"
      />
      <path
        fillRule="evenodd"
        d="M9.3 1.3a.4.4 0 1 0-.8 0v4H8C7 5.3 6.4 6 6.4 7v4c0 1 .8 1.7 1.7 1.7h.4v1.6a.4.4 0 0 0 .8 0v-1.6h.4c.9 0 1.6-.8 1.6-1.7V7c0-.9-.7-1.6-1.6-1.6h-.4v-4Z"
        clipRule="evenodd"
        className="fill-red"
      />
    </svg>
  );
}
