"use client";

import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

// Định nghĩa kiểu cho props
interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ placeholder, value, onChange }: SearchProps) {
  return (
    // Sử dụng div thay vì form để tránh refresh trang khi nhấn Enter
    <div className="relative flex items-center w-full">
      <div className="shadow-lg border border-gray-300 rounded-full w-full py-[12px] px-[25px] flex items-center bg-white">
        <input
          type="text"
          name="keyword"
          placeholder={placeholder}
          className="order-1 text-[16px] font-medium text-black bg-transparent outline-none flex-1"
          // Kết nối giá trị và sự kiện thay đổi từ props
          value={value}
          onChange={onChange}
        />
        {/* Biểu tượng chỉ để trang trí */}
        <div className="order-2 text-[20px] text-gray-700 cursor-pointer">
          <FaMagnifyingGlass />
        </div>
      </div>
    </div>
  );
}
