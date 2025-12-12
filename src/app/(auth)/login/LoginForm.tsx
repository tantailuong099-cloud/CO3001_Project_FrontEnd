"use client";

import { api } from "@/app/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  //nút Clear
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (form) {
      form.reset();
    }
  };

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cookieStr = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_info="));
    if (cookieStr) {
      const value = decodeURIComponent(cookieStr.split("=")[1]);
      try {
        setUser(JSON.parse(value));
      } catch (e) {
        console.error("Failed to parse user_info cookie");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res) {
        // Lấy user info từ backend
        const userData = await api.post("/api/auth/verify", {});
        if (userData.role === "Admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <div className="w-[450px] bg-[#F0F0F0] p-6 border-2 border-gray-400 shadow-xl">
      <h3 className="text-center text-red-600 font-bold text-lg mb-6">
        Enter Username and Password
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 bg-[#E6F0FF] border-2 border-gray-500 focus:outline-none focus:border-blue-500 text-black"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-[#E6F0FF] border-2 border-gray-500 focus:outline-none focus:border-blue-500 text-black"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 mb-4">
          <button
            type="submit"
            className="px-8 py-1.5 bg-[#337AB7] text-white font-semibold border border-gray-600 hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={handleClear}
            className="px-8 py-1.5 bg-[#C0C0C0] text-gray-800 font-semibold border border-gray-600 hover:bg-gray-400"
          >
            Clear
          </button>
        </div>

        {/* Not implement yet */}
        <a href="#" className="text-blue-600 hover:underline text-sm">
          Change password?
        </a>
      </form>
    </div>
  );
}
