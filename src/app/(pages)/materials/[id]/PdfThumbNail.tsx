// src/app/components/PdfThumbnailImage.tsx

"use client"; // 👈 Bắt buộc: Đánh dấu đây là Client Component

import { useState, useEffect } from "react";

interface PdfThumbnailImageProps {
  src: string;
  alt: string;
  className: string;
}

export default function PdfThumbnailImage({
  src,
  alt,
  className,
}: PdfThumbnailImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  // Xử lý trường hợp prop `src` thay đổi
  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    // Khi ảnh lỗi, đổi state sang ảnh fallback
    setImageSrc("/image/demo_materials.png");
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError} // Bây giờ onError đã hợp lệ!
    />
  );
}
