// src/app/(admin)/admin/program/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Search from "@/app/components/pages/search/Search";
import AdminProgramCard from "@/app/components/pages/card/AdminProgramCard";
import DeleteConfirmationModal from "@/app/components/pages/program-detail/DeleteConfirmationModal";
import { PlusCircle } from "lucide-react";

// -------------------------------
// Type for Registration (class group)
// -------------------------------
export interface Registration {
  _id: string;
  courseCode: string;       // course code
  classGroup: string;
  tutor?: string;
  registeredCount: number;
  capacity?: number;
  sessions: { day: string; startTime: string; endTime: string }[];
  status: "created" | "tutor_assigned" | "active" | "closed";
  updatedAt?: string;
  courseName?: string;
  department?: string;
  semester?: string;
}


// -------------------------------
// Map course codes to names & default semester/capacity
// -------------------------------

const COURSE_NAMES: Record<string, string> = {
  CO3045: "Game Programming",
  CO3047: "Advanced Computer Networks",
  CO3049: "Web Programming",
  CO3051: "Mobile Systems",
  CO3057: "Digital Image Processing and Computer Vision",
  CO3059: "Computer Graphics",
  CO3061: "Introduction to Artificial Intelligence",
  CO3065: "Advanced Software Engineering",
  CO3067: "Parallel Computing",
  CO3069: "Cryptography and Network Security",
  CO3071: "Distributed Systems",
  CO3083: "Advance Cryptography and Coding Theory",
  CO3085: "Natural Language Processing",
  CO3089: "High Performance Computing Topics",
  C03115: "Systems Analysis and Design",
  CO4025: "Information and Social Networks",
  CO3117: "Machine Learning",
  CO4031: "Data Warehouses and Decision Support Systems",
  CO4033: "Big Data Analytics and Business Intelligence",
  CO4035: "Enterprise Resource Planning Systems",
  CO4037: "Management Information Systems",
  CO4039: "Biometric Security",
};

const DEFAULT_SEMESTER = "2025 Fall";
const DEFAULT_CAPACITY = 30;
const ITEMS_PER_PAGE = 5;


// -------------------------------
// ProgramAdminPage Component
// -------------------------------

export default function ProgramAdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // -------------------------------
  // Fetch courses and registrations
  // -------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch courses
        const coursesRes = await fetch(`${BACKEND_URL}/api/course`, {
          credentials: "include",
        });
        const coursesDataRaw = await coursesRes.json();
        const coursesData: any[] = Array.isArray(coursesDataRaw)
          ? coursesDataRaw
          : Array.isArray(coursesDataRaw.data)
            ? coursesDataRaw.data
            : [];

        const coursesMap: Record<string, any> = {};
        coursesData.forEach((c: any) => {
          if (c.courseCode) coursesMap[c.courseCode] = c;
        });

        // Fetch registrations
        const regRes = await fetch(`${BACKEND_URL}/api/matching/registrations`, {
          credentials: "include",
        });
        const regDataRaw = await regRes.json();
        const regData: any[] = Array.isArray(regDataRaw)
          ? regDataRaw
          : Array.isArray(regDataRaw.data)
            ? regDataRaw.data
            : [];

        // Merge course info into registrations
        const enriched: Registration[] = regData.map((r: any) => {
          const course = coursesMap[r.courseCode] || {};
          console.log("REG courseCode:", r.courseCode, "courseName:", COURSE_NAMES[r.courseCode]);

          return {
            ...r,
            courseName: course.courseName || COURSE_NAMES[r.courseCode],
            semester: course.semester || DEFAULT_SEMESTER,
            capacity: course.capacity || DEFAULT_CAPACITY,
            department: course.department || "—",
          };
        });

        setRegistrations(enriched);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }

    fetchData();
  }, []);

  // -------------------------------
  // Delete modal handlers
  // -------------------------------
  const openDeleteModal = (id: string) => {
    setTargetId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (isLoading) return;
    setTargetId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!targetId) return;
    setIsLoading(true);

    try {
      const [courseCode, classGroup] = targetId.split('_');

      const res = await fetch(`${BACKEND_URL}/api/matching/registrations/${courseCode}/${classGroup}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setRegistrations((prev) =>
        prev.filter(
          (r) => !(r.courseCode === courseCode && r.classGroup === classGroup)
        )
      );

    } catch (err) {
      console.error("Failed to delete class group:", err);
    } finally {
      setIsLoading(false);
      closeDeleteModal();
    }
  };

  // -------------------------------
  // Filter & pagination
  // -------------------------------
  const filteredRegistrations = useMemo(() => {
    if (!searchTerm) return registrations;
    return registrations.filter((r) =>
      r.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.classGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [registrations, searchTerm]);

  const totalPages = Math.ceil(filteredRegistrations.length / ITEMS_PER_PAGE);
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddNew = () => router.push("/admin/program/new");

  // -------------------------------
  // Pagination logic
  // -------------------------------
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) end = Math.min(totalPages, maxShown);
    else if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - (maxShown - 1));

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="py-10 px-[30px] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Course Administration</h1>
          <p className="text-gray-600 text-sm font-medium">Admin / Courses</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
        >
          <PlusCircle size={18} />
          Add New Course
        </button>
      </div>

      {/* Centered Search */}
      <div className="flex justify-start mb-7">
        <div className="w-full max-w-xl">
          <Search
            placeholder="Search Course or Group..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 border-b border-gray-300 text-left">
            <tr>
              <th className="px-4 py-3">Course Code</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Tutor</th>
              <th className="px-4 py-3 text-center">Semester</th>
              <th className="px-4 py-3 text-center">Class Group</th>
              <th className="px-4 py-3 text-center">Registered</th>
              <th className="px-4 py-3 text-center">Sessions</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Last Updated</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRegistrations.map((reg) => (
              <AdminProgramCard
                key={reg.courseCode + reg.classGroup}
                classGroup={{ ...reg, id: reg.courseCode + "_" + reg.classGroup }}
                onDelete={openDeleteModal}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Smart Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2 bg-white p-3 rounded-xl shadow border">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border font-semibold transition
                        bg-gray-100 text-gray-900 hover:bg-gray-200
                        disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border font-semibold transition
                    ${currentPage === page
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                >
                  {page}
                </button>
              ) : (
                <span key={`e-${index}`} className="px-3 text-gray-400">…</span>
              )
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border font-medium 
                        hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}



      {/* Delete modal */}
      {isModalOpen && targetId && (
        <DeleteConfirmationModal
          itemName={registrations.find((c) => c._id === targetId)?.courseName || "this class group"}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
