// src/app/(pages)/materials/[id]/page.tsx

import type { Metadata } from "next";
import Search from "@/app/components/pages/search/Search";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import PdfThumbnailImage from "./PdfThumbNail";
import PdfPreviewer from "./PdfPreviewer";
import { marked } from "marked";

// 1. Định nghĩa Type cho Material, khớp với Schema
interface Material {
  _id: string;
  materialName: string;
  overview: string;
  description: string;
  author: string;
  pdfUrl: string;
  type: "shared" | "official";
  createdAt: string;
}

// 2. Hàm fetch dữ liệu chi tiết
// Next.js sẽ tự động cache kết quả này
async function getMaterialDetail(id: string): Promise<Material | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const res = await fetch(`${API_URL}/api/materials/${id}`);

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching material detail:", error);
    return null;
  }
}

// 3. Hàm tạo metadata động
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const material = await getMaterialDetail(params.id);
  return {
    title: material ? material.materialName : "Material Not Found",
    description: material?.overview || "Tutor Support System",
  };
}

// 4. Hàm helper để tạo thumbnail cho các trang PDF
const getPdfPageThumbnail = (pdfUrl: string, page: number): string => {
  if (pdfUrl && pdfUrl.includes("res.cloudinary.com")) {
    const parts = pdfUrl.split("/upload/");
    if (parts.length === 2) {
      const transformedUrl = `${parts[0]}/upload/pg_${page}/${parts[1]}`;
      return transformedUrl.replace(/\.pdf$/, ".png");
    }
  }
  return "/image/demo_materials.png";
};

export default async function MaterialsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const material = await getMaterialDetail(params.id);

  if (!material) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Material Not Found
        </h1>
        <p className="text-gray-600">
          The material you are looking for does not exist.
        </p>
        <Link
          href="/materials"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Library
        </Link>
      </main>
    );
  }

  const descriptionHtml = marked(
    material.description || material.overview || ""
  );

  const mainCoverUrl = getPdfPageThumbnail(material.pdfUrl, 1);
  const previewPages = Array.from({ length: 5 }, (_, i) =>
    getPdfPageThumbnail(material.pdfUrl, i + 1)
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-16 py-10">
      {/* Header */}
      {/* <div className="py-7 px-[30px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Material Library</h1>
          <Search placeholder="Search Book Name" />
        </div>
      </div> */}

      {/* 👇 Thay đổi layout chính sang CSS Grid (4 cột) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Cột 1: Ảnh bìa (chỉ hiển thị trên Desktop cho đẹp) */}
        <div className="hidden lg:block bg-white p-4 shadow-md rounded-lg">
          <PdfThumbnailImage
            src={mainCoverUrl}
            alt={material.materialName}
            className="rounded-md w-full h-auto"
          />
        </div>

        {/* Cột 2 & 3: Description */}
        <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
            Description
          </h2>
          {/* <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: material.description || material.overview,
            }}
          /> */}
          <div
            className="prose prose-sm max-w-none" // Sẽ giải thích ở bước 3
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>

        {/* Cột 4: Download & Preview */}
        <div className="lg:col-span-1">
          <PdfPreviewer
            pdfUrl={material.pdfUrl}
            //mainCoverUrl={mainCoverUrl}
            previewPages={previewPages}
          />
        </div>

        {/* 👇 Ô Information dài hết 4 cột */}
        <div className="lg:col-span-4 bg-white p-6 shadow-md rounded-lg text-sm mt-6">
          <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
            Information
          </h2>
          {/* 👇 Layout grid 2 cột bên trong và căn lề trái */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
            <p>
              <strong className="block font-medium text-gray-500">
                Document Title
              </strong>
              {material.materialName}
            </p>
            <p>
              <strong className="block font-medium text-gray-500">
                Author
              </strong>
              {material.author}
            </p>
            <p>
              <strong className="block font-medium text-gray-500">Type</strong>
              <span className="capitalize">{material.type}</span>
            </p>
            <p>
              <strong className="block font-medium text-gray-500">
                Date Posted
              </strong>
              {new Date(material.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
