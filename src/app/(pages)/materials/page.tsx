import MaterialsCard from "@/app/components/card/MaterialsCard";
import Search from "@/app/components/search/Search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials",
  description: "Tutor Support System",
};

export default function MaterialsPage() {
  return (
    <>
      <div className="py-7 px-[30px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Material Library</h1>

          <Search placeholder="Search Book Name" />
        </div>
        <div className="grid grid-cols-5 gap-6 mt-[30px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <MaterialsCard key={index}/>
          ))}
        </div>
      </div>
    </>
  );
}
