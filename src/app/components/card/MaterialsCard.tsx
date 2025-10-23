import Image from "next/image";
import Link from "next/link";
// import { Download, BookOpen } from "lucide-react"; // icon từ lucide-react

export default function MaterialsCard() {

  return (
    <Link 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col border-1 border-[#D9D9D9]"
      href={`/materials/adsd`}
    >
      {/* Ảnh minh họa */}
      <div className="relative w-auto h-60 rounded-xl overflow-hidden mb-4">
        <Image
          src="/image/demo_materials.png"
          alt="Vật Lý 1"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Nội dung */}
      <div className="flex-1 flex flex-col justify-between border-t  border-[#D9D9D9]">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Vật Lý 1
          </h2>
          <p className="text-gray-500 text-sm">
            Tài liệu môn Vật Lý 1 - Đại học Bách Khoa
          </p>
        </div>
      </div>
    </Link>
  );
}
