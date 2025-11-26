import DashboardCard from "@/app/components/admin/card/DashboardCard";
import type { Metadata } from "next";
import OverviewLineChart from "./OverViewChart";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Tutor Support System",
};

export default function AdminHomePage() {
  const dashboardData = [
    {
      src: "/image/section-1-icon-1.svg",
      content: "Tutor",
      data: 36,
    },
    {
      src: "/image/section-1-icon-1.svg",
      content: "Student",
      data: 3636,
    },
    {
      src: "/image/section-1-icon-2.svg",
      content: "Course",
      data: 1200,
    },
  ];
  return (
    <>
      <div className="p-6">
        <h1 className="text-black mb-[30px] font-[700] text-[32px]">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {dashboardData.map((item, index) => (
            <DashboardCard
              key={index}
              src={item.src}
              content={item.content}
              data={item.data}
            />
          ))}
        </div>

        <OverviewLineChart />
      </div>
    </>
  );
}
