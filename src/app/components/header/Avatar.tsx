'use client'

import Image from "next/image";
import Link from "next/link";
import { FiBell } from "react-icons/fi";

export default function Avatar() {
  return(
    <>
      {/* Notification icon */}
      <button className="p-2 rounded-full hover:bg-[#1e3a8a] transition">
        <FiBell className="h-5 w-5 text-white cursor-pointer" />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/image/logo.svg"
          alt="Bach Khoa University Logo"
          width={200}
          height={200}
          className="h-12 w-12 rounded-full object-cover"
          priority
        />
      </Link>
    </>
  )
}