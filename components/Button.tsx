import React from "react";

type Props = {
  text: string;
};

export default function Button({ text }: Props) {
  return (
    <button className="bg-green text-background rounded-3xl px-5 py-2 text-sm font-semibold capitalize">
      {text}
    </button>
  );
}
