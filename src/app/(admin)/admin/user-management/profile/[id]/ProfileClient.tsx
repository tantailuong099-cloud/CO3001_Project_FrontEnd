"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Mail, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { api } from "@/app/services/api"; // Đảm bảo đường dẫn đúng

// 1. Định nghĩa Interface cho Admin (dựa trên Schema User cơ bản)
interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role: "Admin";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface cho kết quả trả về từ API /auth/verify
interface VerifyResponse {
  userId: string;
  // Các trường khác như email, role...
}

export default function AdminProfileClient({userId}: any) {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Fetch data động theo 2 bước
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setIsLoading(true);

        // Bước 1: Gọi API verify để lấy userId của user đang đăng nhập
        // const verifyResponse = await api.post<VerifyResponse>(
        //   "/api/auth/verify"
        // );
        // const { Id } = verifyResponse;

        // if (!Id) {
        //   throw new Error("Authentication failed. Could not get user ID.");
        // }

        // Bước 2: Dùng userId lấy được để fetch thông tin chi tiết
        const adminData = await api.get<AdminProfile>(`/api/user/${userId}`);
        setProfile(adminData);
      } catch (err: any) {
        console.error("Failed to fetch admin profile:", err);
        setError("Could not load your profile. Please try logging in again.");
        // Optional: Tự động redirect về trang login nếu lỗi xác thực
        // router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, [router]); // Thêm router vào dependency array nếu bạn dùng nó trong catch

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  // 3. Xử lý trạng thái Loading và Error
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <button
          onClick={() => router.push("/login")} // Nút quay về trang login
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // 4. Render giao diện với dữ liệu của Admin
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          {/* Nút này có thể không cần thiết nếu đây là trang cá nhân */}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-100">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-16 h-16 text-red-300" />
              )}
            </div>
            <div className="flex-1 mt-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.name}
              </h2>
              <span className="px-4 py-1.5 rounded-full text-sm font-bold tracking-wide bg-red-100 text-red-700">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái: Thông tin chính */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <h3 className="bg-gray-50 text-lg font-semibold text-gray-900 px-5 py-3 border-b border-gray-200">
                  Account Details
                </h3>
                <div className="bg-white p-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Email Address
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        System ID
                      </div>
                      <p className="text-base font-semibold text-gray-900 text-gray-500 select-all">
                        {profile._id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Hoạt động tài khoản */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <h3 className="bg-gray-50 text-lg font-semibold text-gray-900 px-5 py-3 border-b border-gray-200">
                  Account Activity
                </h3>
                <div className="bg-white p-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Account Created
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {formatDate(profile.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Last Profile Update
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {formatDate(profile.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
