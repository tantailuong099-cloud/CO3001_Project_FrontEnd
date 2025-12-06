// CO3001_Project_FrontEnd_main\src\app\(pages)\program\registered\page.tsx

import type { Metadata } from "next";
import ProgramCard2 from "@/app/components/pages/card/ProgramCard_2";
import Search from "@/app/components/pages/search/Search";

export const metadata: Metadata = {
  title: "Available Classes",
  description: "Select a class to register",
};

export default function AvailableClassesPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">AVAILABLE COURSE</h1>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <Search placeholder={params.id} />
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          <ProgramCard2 
            courseId={params.id}
            courseName="DATABASE SYSTEM"
            credits={4.0}
          />
        </div>
      </div>
    </div>
  );
}