"use client";
import { usePathname } from "next/navigation";
import BurjXLogoSvg from "../icons/BurjXLogoSvg";

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    pathname == "/" && (
      <div className="mb-8 flex items-center justify-center max-sm:mb-15">
        <BurjXLogoSvg />
      </div>
    )
  );
}
