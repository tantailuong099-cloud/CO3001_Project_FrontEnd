// src/app/(main)/materials/page.tsx

"use client"; // Chuyển toàn bộ file thành Client Component để đơn giản

import React, { useState, useMemo, useEffect } from "react";
import MaterialsCard from "@/app/components/pages/card/MaterialsCard";
import Search from "@/app/components/pages/search/Search";
// Xóa Metadata vì nó chỉ hoạt động trong Server Component.
// Bạn có thể đặt nó trong file layout.tsx nếu cần.

// 1. Định nghĩa Type cho Material, khớp với Schema
interface Material {
  _id: string;
  materialName: string;
  overview: string;
  author: string;
  pdfUrl: string;
  type: "shared" | "official";
  createdAt: string;
}

// 3. Component chính của trang
export default function MaterialsPage() {
  // State để lưu trữ danh sách tài liệu và từ khóa tìm kiếm
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Thêm state loading

  // 2. Hàm fetch dữ liệu, sử dụng useEffect để gọi khi component được mount
  useEffect(() => {
    async function getMaterials() {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${API_URL}/api/materials`);

        if (!res.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setMaterials([]); // Đặt lại mảng rỗng nếu có lỗi
      } finally {
        setIsLoading(false); // Dừng loading dù thành công hay thất bại
      }
    }

    getMaterials();
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  // 4. Lọc danh sách tài liệu dựa trên searchTerm
  const filteredMaterials = useMemo(() => {
    if (!searchTerm) {
      return materials;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return materials.filter(
      (material) =>
        material.materialName.toLowerCase().includes(lowercasedFilter) ||
        material.author.toLowerCase().includes(lowercasedFilter)
    );
  }, [materials, searchTerm]);

  // Hàm xử lý khi người dùng nhập vào ô search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="py-7 px-[30px]">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">Material Library</h1>
        {/* Kết nối Search component với state */}
        <Search
          placeholder="Search by Name or Author..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* 5. Render danh sách đã được lọc */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-[30px]">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500 mt-10">
            Loading materials...
          </p>
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <MaterialsCard key={material._id} material={material} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No materials found.
          </p>
        )}
      </div>
    </div>
  );
}
