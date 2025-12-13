"use client"; // 👈 QUAN TRỌNG: Chuyển thành Client Component để sử dụng hooks

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { api } from "@/app/services/api"; // 👈 Giả sử bạn có một service API client

// --- Interfaces cho dữ liệu người dùng ---
interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

// --- Component Skeleton để hiển thị khi đang tải ---
const HeaderSkeleton = () => (
  <div className="fixed top-0 left-0 w-full h-[70px] bg-white border-b border-gray-200 z-[9999] flex animate-pulse">
    <div className="w-[240px] flex items-center justify-center">
      <div className="h-8 w-32 bg-gray-200 rounded"></div>
    </div>
    <div className="flex-1 flex justify-end items-center gap-10 mr-10">
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications] = useState(6); // Tạm thời giữ tĩnh

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Bước 1: Xác thực và lấy userId
        const verifyResponse: any = await api.post("/api/auth/verify");
        const { userId } = verifyResponse;

        if (!userId) {
          throw new Error("User not authenticated.");
        }

        // Bước 2: Dùng userId để lấy thông tin chi tiết
        const profileResponse: any = await api.get(`/api/user/${userId}`);

        setUser({
          name: profileResponse.name,
          role: profileResponse.role,
          avatar: profileResponse.avatar,
        });
      } catch (error) {
        console.error("Failed to fetch user data for header:", error);
        // Nếu xác thực thất bại, chuyển hướng về trang login
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Hiển thị skeleton UI trong khi đang tải dữ liệu
  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] bg-white border-b border-gray-200 z-[9999] flex ">
      {/* Logo */}
      <div className="w-[240px] flex items-center justify-center">
        <Link
          href="/admin/dashboard" // Link tới dashboard admin
          className="flex items-center gap-3 text-lg font-semibold uppercase"
        >
          <Image
            src="/image/logo.svg"
            alt="BKU Logo"
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
              WebkitMaskImage: "url(/image/notifications.png)",
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
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden relative">
            <Image
              src={user?.avatar || "/images/avatar.jpg"} // Fallback sang avatar mặc định
              alt="Avatar"
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <div className="font-bold text-[14px] text-gray-800">
              {user?.name || "Loading..."}
            </div>
            <div className="font-semibold text-[12px] text-gray-600">
              {user?.role || "..."}
            </div>
          </div>
        </Link>

        {/* Menu Button (mobile) */}
        <button className="hidden md:hidden text-xl">
          <FaBars />
        </button>
      </div>
    </header>
  );
}
