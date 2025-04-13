import { Loader2 } from "lucide-react";

type Props = {
  text: string;
};

export default function Loader({ text }: Props) {
  return (
    <div className="flex justify-center gap-2">
      <Loader2 className="stroke-green animate-spin" />
      <span className="text-white/50">{text}</span>
    </div>
  );
}
