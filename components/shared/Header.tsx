"use client";
import { usePathname } from "next/navigation";
import BurjXLogo from "../icons/BurjXLogo";

export default function Header() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    pathname == "/" && (
      <div className="mb-8 flex items-center justify-center max-sm:mb-15">
        <BurjXLogo />
      </div>
    )
  );
}
