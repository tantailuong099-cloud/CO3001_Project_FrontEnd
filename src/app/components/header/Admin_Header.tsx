import Image from "next/image";
import Link from "next/link";
import { HeaderItem } from "./HeaderItem";
import Avatar from "./Avatar";

export default function Header() {
  const menu = [
    // {
    //   title: "Home Page",
    //   link: "/"
    // },
    // {
    //   title: "My Course",
    //   link: "/courses"
    // },
    // {
    //   title: "Course",
    //   link: "/program"
    // },
    // {
    //   title: "Material",
    //   link: "/materials",
    // },
    {
      title: "View Report",
      link: "/admin/report",
    },
    {
      title: "User Management",
      link: "/admin/user-management",
    },
    {
      title: "Program Management",
      link: "/admin/program",
    },
  ];
  return (
    <>
      <header className="bg-[#0C54E4] flex items-center px-6 h-16">
        <div className="flex items-center justify-between h-full w-full">
          <div className="flex items-center h-full w-full gap-7">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/image/logo.svg"
                alt="Bach Khoa University Logo"
                width={200}
                height={200}
                className="h-12 w-auto"
                priority
              />
            </Link>
            {/* Navigation Bar */}
            <nav className="h-full">
              <ul className="flex items-center h-full">
                {menu.map((item, index) => (
                  <HeaderItem item={item} key={index} />
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Avatar/>
          </div>
        </div>
      </header>
    </>
  );
}
