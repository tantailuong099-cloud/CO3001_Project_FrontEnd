"use client";

// 1. Import useState and useRouter
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Import useRouter
// --- FIX: Corrected alias import paths ---
import Search from "@/app/components/search/Search";
// 2. Import AdminProgramCardProps
import AdminProgramCard, {
  AdminProgramCardProps,
} from "@/app/components/card/AdminProgramCard";
import type { Metadata } from "next";
import { PlusCircle } from "lucide-react";
// 3. Import the modal
import DeleteConfirmationModal from "@/app/components/program-detail/DeleteConfirmationModal";
// --- END FIX ---

// Note: Metadata export is commented out as it's not supported
// in Client Components. This should be in a parent layout.tsx.
// export const metadata: Metadata = {
//   title: "Program Admin",
//   description: "Tutor Support System",
// };

// Get the Course type from AdminProgramCardProps
type Course = AdminProgramCardProps["course"];

// Mock data moved to a constant
const initialCourses: Course[] = [
  {
    code: "CO2301",
    name: "Computer Network",
    credit: 4,
    lecturer: "Phạm Hồng Phát",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Nov 1, 2025",
    duration: "15 weeks",
    sessionCode: "CC01",
    sessionType: "Offline",
    location: "H1, BKHCM",
    status: "Ongoing",
    updatedAt: "Oct 25, 2025",
  },
  {
    code: "CO2203",
    name: "Data Structures & Algorithms",
    credit: 4,
    lecturer: "Trần Thị Xuân Hương",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Nov 3, 2025",
    duration: "15 weeks",
    sessionCode: "L01",
    sessionType: "Offline",
    location: "H6, BKHCM",
    status: "Ongoing",
    updatedAt: "Oct 21, 2025",
  },
  {
    code: "CO2402",
    name: "Machine Learning",
    credit: 3,
    lecturer: "",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Sep 1, 2025",
    duration: "15 weeks",
    sessionCode: "TN01",
    sessionType: "Online",
    location: "–",
    status: "Completed",
    updatedAt: "Sep 10, 2025",
  },
];

export default function ProgramAdminPage() {
  // 4. Add state for courses list and modal controls
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetCourseCode, setTargetCourseCode] = useState<
    string | number | null
  >(null);
  const router = useRouter(); // <-- Add router instance

  // 5. Create handlers for delete logic
  const openDeleteModal = (code?: string | number) => {
    if (!code) return;
    setTargetCourseCode(code);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isLoading) return; // Don't close while deleting
    setIsModalOpen(false);
    setTargetCourseCode(null);
  };

  const confirmDelete = () => {
    if (!targetCourseCode) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCourses((currentCourses) =>
        currentCourses.filter((course) => course.code !== targetCourseCode)
      );
      setIsLoading(false);
      closeDeleteModal();
      // In a real app, you'd show a success toast here
    }, 1000); // 1 second delay
  };

  // --- ADDED: Handler for "Add New Course" ---
  const handleAddNewCourse = () => {
    router.push("/admin/program/new");
  };
  // --- END ---

  const targetCourse = courses.find((c) => c.code === targetCourseCode);

  return (
    <div className="py-10 px-[30px] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Course Administration
          </h1>
          <p className="text-gray-600 text-sm font-medium">Admin / Courses</p>
        </div>

        {/* --- UPDATED: Button now uses onClick handler --- */}
        <button
          onClick={handleAddNewCourse}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
        >
          <PlusCircle size={18} />
          Add New Course
        </button>
        {/* --- END UPDATE --- */}
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-10">
        <Search placeholder="Search Course by Name or Code..." />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 border-b border-gray-300 text-left">
            <tr>
              <th className="px-4 py-3">Course Code</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3 text-center">Credits</th>
              <th className="px-4 py-3">Lecturer</th>
              <th className="px-4 py-3 text-center">Semester</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3 text-center">Session</th>
              <th className="px-4 py-3 text-center">Type</th>
              <th className="px-4 py-3 text-center">Location</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Last Updated</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <AdminProgramCard
                key={course.code}
                course={course}
                // 6. Pass the open modal handler to the card
                onDelete={openDeleteModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer hint */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        Showing {courses.length} courses • Data last synced on{" "}
        <span className="font-medium">Oct 27, 2025</span>
      </p>

      {/* 7. Render the modal conditionally */}
      {isModalOpen && targetCourse && (
        <DeleteConfirmationModal
          itemName={targetCourse.name}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

