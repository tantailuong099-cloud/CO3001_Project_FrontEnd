'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const isActive = pathname === item.link;

  return (
    <li className="h-full">
      <Link
        href={item.link}
        className={`flex items-center justify-center h-full px-6 font-bold text-[16px] transition-all 
          ${isActive ? "bg-[#1e3a8a] text-white" : "text-white hover:bg-[#1e3a8a]"}`}
      >
        {item.title}
      </Link>
    </li>
  );
};
