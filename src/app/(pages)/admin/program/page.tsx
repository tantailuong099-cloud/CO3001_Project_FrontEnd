import Search from "@/app/components/search/Search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Admin",
  description: "Tutor Support System",
};

export default function ProgramAdminPage() {
    return (
      <>
        <div className="py-7 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold">Available Course</h1>
  
            <Search placeholder="Find Course Here..." />
          </div>
          
  
  
        </div>
      </>
    );
}
