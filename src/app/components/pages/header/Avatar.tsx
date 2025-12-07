// 'use client'

// import Image from "next/image";
// import Link from "next/link";
// import { FiBell } from "react-icons/fi";

// export default function Avatar() {
//   return(
//     <>
//       {/* Notification icon */}
//       <button className="p-2 rounded-full hover:bg-[#1e3a8a] transition">
//         <FiBell className="h-5 w-5 text-white cursor-pointer" />
//       </button>

//       {/* Logo */}
//       <Link href="/profile" className="flex items-center">
//         <Image
//           src="/image/logo.svg"
//           alt="Bach Khoa University Logo"
//           width={200}
//           height={200}
//           className="h-12 w-12 rounded-full object-cover"
//           priority
//         />
//       </Link>
//     </>
//   )
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { User, LogOut } from "lucide-react";
import { api } from "@/app/services/api";

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // Gọi API logout (qua service axios)
      await api.post("/api/auth/logout");

      // Sau khi logout, reload hoặc redirect
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/admin/login"; // fallback
    }
    window.location.reload();
  };

  return (
    <div className="relative flex items-center gap-3">
      <button className="p-2 rounded-full hover:bg-[#1e3a8a] transition">
        <FiBell className="h-5 w-5 text-white cursor-pointer" />
      </button>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center">
          <Image
            src="/image/logo.svg"
            alt="User Avatar"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover transition-all duration-200 hover:shadow-2xl cursor-pointer"
            priority
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold text-gray-800">
                Trình Ai Chấm
              </p>
              <p className="text-xs text-gray-500 break-words">
                anhmuonlam3metuhao@gmail.com
              </p>
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={16} />
              <span>Profile</span>
            </Link>

            <div className="border-t my-1"></div>

            <button
              // onClick={() => {
              //   setIsOpen(false);
              //   console.log("Logout clicked");
              // }}
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
