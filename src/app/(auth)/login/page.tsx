import type { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/LoginForm";
import Image from "next/image";
// import LoginHeader from "@/app/components/header/LoginHeader"

export const metadata: Metadata = {
  title: "Trang Đăng Nhập",
  description: "Tutor Support System",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E0E0E0]">
      {/* <LoginHeader /> */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="flex items-start gap-12">
          <LoginForm />
          <div className="hidden lg:block">
            <Image
              src="/image/loginpicture.jpg"
              alt="BKU Gate"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
