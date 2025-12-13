// src/app/(main)/materials/page.tsx

import MaterialsCard from "@/app/components/pages/card/MaterialsCard";
import Search from "@/app/components/pages/search/Search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials",
  description: "Tutor Support System",
};

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

// 2. Hàm fetch dữ liệu
async function getMaterials(): Promise<Material[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${API_URL}/api/materials`, {
      // Tăng thời gian cache (ví dụ: 10 phút) để không phải gọi API liên tục
      // next: { revalidate: 6 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch materials");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching materials:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}

// 3. Chuyển component thành async và gọi hàm fetch
export default async function MaterialsPage() {
  const materials = await getMaterials();

  return (
    <>
      <div className="py-7 px-[30px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Material Library</h1>
          <Search placeholder="Search Book Name" />
        </div>

        {/* 4. Render danh sách động */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-[30px]">
          {materials.length > 0 ? (
            materials.map((material) => (
              <MaterialsCard key={material._id} material={material} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No materials found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
