// src/app/components/pages/card/MaterialsCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// 1. Định nghĩa Type cho Material (có thể import từ page.tsx)
interface Material {
  _id: string;
  materialName: string;
  overview: string;
  pdfUrl: string;
  // Các trường khác nếu cần
}

interface MaterialsCardProps {
  material: Material;
}

// 2. Hàm helper để chuyển đổi URL PDF của Cloudinary sang URL ảnh
const getPdfThumbnailUrl = (pdfUrl: string): string => {
  if (pdfUrl && pdfUrl.includes("res.cloudinary.com")) {
    // Tách URL thành 2 phần tại "/upload/"
    const parts = pdfUrl.split("/upload/");

    if (parts.length === 2) {
      // Ghép lại với transformation ở giữa
      // parts[0] là "https://res.cloudinary.com/drnjfhwam/image"
      // parts[1] là "v176.../zzd...pdf"
      const transformedUrl = `${parts[0]}/upload/pg_1/${parts[1]}`;

      // Đổi đuôi file
      return transformedUrl.replace(/\.pdf$/, ".png");
    }
  }
  return "/image/demo_materials.png";
};

export default function MaterialsCard({ material }: MaterialsCardProps) {
  // 3. Lấy URL ảnh thumbnail
  const thumbnailUrl = getPdfThumbnailUrl(material.pdfUrl);

  return (
    <Link
      // 4. Dùng _id để tạo link tới trang chi tiết
      href={`/materials/${material._id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col border border-gray-200"
    >
      {/* Ảnh minh họa động từ PDF */}
      <div className="relative w-full h-60 rounded-xl overflow-hidden mb-4 bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={material.materialName}
          fill
          className="object-contain" // object-contain tốt cho bìa sách
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority // Ưu tiên tải ảnh đầu tiên trong viewport
          // Xử lý lỗi nếu ảnh không load được
          onError={(e) => {
            e.currentTarget.src = "/image/demo_materials.png";
          }}
        />
      </div>

      {/* Nội dung động */}
      <div className="flex-1 flex flex-col justify-between border-t border-gray-200 pt-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {material.materialName}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2">
            {material.overview || "No overview available."}
          </p>
        </div>
      </div>
    </Link>
  );
}
