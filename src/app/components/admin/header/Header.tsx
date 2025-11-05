"use client";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function Header({
  userName = "Le Van A",
  role = "Admin",
  avatar = "/images/avatar.jpg",
  notifications = 6,
}) {
  return (
    <header className="fixed top-0 left-0 w-full h-[70px] bg-white border-b border-gray-200 z-[9999] flex ">
      {/* Logo */}
      <div className="w-[240px] flex items-center justify-center">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 text-lg font-semibold uppercase"
        >
          {/* <span className="rounded bg-gradient-to-br from-[#ff6f61] to-[#ff914d] px-3 py-1 text-sm tracking-widest text-black">
            ARC
          </span> */}
          <Image
            src="/image/logo.svg"
            alt="BKU"
            width={20}
            height={20}
            className={"h-[60px] w-auto"}
          />
          <span className="hidden text-sm tracking-[0.32em] text-black sm:block">
            BK Helper
          </span>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex-1 flex justify-end items-center gap-10 mr-10">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <div
            className="w-[30px] h-[30px] bg-gradient-to-br from-[#0C54E4] to-[#497FEA]"
            style={{
              WebkitMaskImage: "url(/icon/notifications.png)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",
              maskImage: "url(/image/notifications.png)",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[12px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
            {notifications}
          </span>
        </div>

        {/* Account */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-11 h-11 rounded-full overflow-hidden relative">
            <Image
              src={avatar}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <div className="font-bold text-[14px] text-gray-800">
              {userName}
            </div>
            <div className="font-semibold text-[12px] text-gray-600">
              {role}
            </div>
          </div>
        </div>

        {/* Menu Button (mobile) */}
        <button className="hidden md:hidden text-xl">
          <FaBars />
        </button>
      </div>
    </header>
  );
}
