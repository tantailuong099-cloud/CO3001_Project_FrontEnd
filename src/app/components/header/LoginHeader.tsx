import Image from "next/image";
import Link from "next/link";

{/*Not used yet*/}
export default function LoginHeader() {
  return (
    <header className="bg-[#3366CC] flex items-center px-6 h-14 shadow-md">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/image/logo.svg"
          alt="Bach Khoa University Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
        <h1 className="text-white text-2xl font-semibold">
          Central Authentication Service
        </h1>
      </Link>
    </header>
  );
}