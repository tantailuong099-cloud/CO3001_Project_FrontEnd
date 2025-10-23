import ProgramCard1 from "@/app/components/card/ProgramCard_1";
import Search from "@/app/components/search/Search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program",
  description: "Tutor Support System",
};

export default function ProgramPage() {
    return (
    <>
      <div className="py-7 px-[30px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Available Course</h1>

          <Search placeholder="Find Course Here..." />
        </div>
        <div className="grid grid-cols-1 gap-6 mt-[30px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <ProgramCard1 key={index}/>
          ))}
        </div>


      </div>
    </>
  );
}
