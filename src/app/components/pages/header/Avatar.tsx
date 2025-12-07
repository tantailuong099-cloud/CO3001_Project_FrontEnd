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
import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { User, LogOut } from "lucide-react";
import { api } from "@/app/services/api";
import { userApi, type User as UserType } from "@/app/services/userApi";

interface VerifyResponse {
  userId: string;
  email: string;
  role: string;
}

export default function Avatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const verifyResponse = await api.post<VerifyResponse>("/api/auth/verify");
        const { userId } = verifyResponse;

        if (userId) {
          const userData = await userApi.getUserById(userId);
          setUser(userData);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/login";
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      <button className="p-2 rounded-full hover:bg-[#1e3a8a] transition">
        <FiBell className="h-5 w-5 text-white cursor-pointer" />
      </button>

      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover transition-all duration-200 hover:shadow-2xl cursor-pointer border-2 border-white"
            />
          ) : (
            <Image
              src="/image/logo.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover transition-all duration-200 hover:shadow-2xl cursor-pointer"
              priority
            />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 break-words">
                {user?.email || ""}
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
