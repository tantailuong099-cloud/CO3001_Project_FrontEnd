import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Tutor Support System",
};

export default function Home() {
  return (
    <>
      <div className="relative flex-1 overflow-hidden min-h-[calc(100vh-8rem)]">
        {/* Ảnh nền */}
        <div className="relative h-[110vh]">
          <Image
            src="/image/homepage.png"
            alt="Home Background"
            fill
            className="object-cover"
            style={{ objectPosition: "center 100%" }} // 
            priority
          />
        </div>
      </div>
    </>
  );
}
