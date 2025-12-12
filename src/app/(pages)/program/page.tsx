// CO3001_Project_FrontEnd_main\src\app\(pages)\program\page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProgramCourseCard from "@/app/components/pages/card/ProgramCourseCard";
import SearchBar from "@/app/components/pages/search/CourseSearchBar";

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  description?: string;
  duration: string;
  capacity: number;
  registrationStart: string;
  registrationEnd: string;
  courseStart: string;
  courseEnd: string;
  status: string; 
  tutors: string[] | string; 
}

interface Tutor {
  _id: string;
  name: string;
}

interface Registration {
  _id: string;
  classGroup: string;
  tutor?: string | null;
  students?: string[];
  registeredCount?: number;
  sessions?: any[];
}

export default function ProgramPage() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [courses, setCourses] = useState<Course[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClosed, setShowClosed] = useState(false);

  // -----------------------------------------------
  // FETCH COURSES + TUTORS
  // -----------------------------------------------
  useEffect(() => {
    async function fetchAll() {
      try {
        const [courseRes, tutorRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/course`, { credentials: "include" }),
          fetch(`${BACKEND_URL}/api/user/Tutor`, { credentials: "include" }),
        ]);

        const cJson = await courseRes.json();
        const tJson = await tutorRes.json();

        const loadedCourses = Array.isArray(cJson) ? cJson : cJson.data || [];
        setTutors(Array.isArray(tJson) ? tJson : tJson.data || []);

        // 🔥 NEW: fetch real class groups for each course
        const coursesWithRealGroups = await Promise.all(
          loadedCourses.map(async (course: Course) => {
            const regRes = await fetch(
              `${BACKEND_URL}/api/matching/registrations?courseId=${course._id}`,
              { credentials: "include" }
            );
            const rjson = await regRes.json();
            const regs = Array.isArray(rjson) ? rjson : rjson.data || [];

            return {
              ...course,
              classGroups: regs.map((r: Registration) => r.classGroup) // 👈 true source of groups
            };
          })
        );

        setCourses(coursesWithRealGroups);
      } catch (err) {
        console.error("Failed to load:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [BACKEND_URL]);

  
  // -----------------------------------------------
  // BUILD tutorId → tutorName lookup
  // -----------------------------------------------
  const tutorNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    tutors.forEach((t) => (map[t._id] = t.name));
    return map;
  }, [tutors]);

  // -----------------------------------------------
  // FILTER COURSES
  // -----------------------------------------------
  const filteredCourses = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return courses.filter((c) => {
      const isCompleted = c.status === "completed";

      if (!showClosed && isCompleted) return false;
      if (showClosed && !isCompleted) return false;

      return (
        c.courseCode.toLowerCase().includes(term) ||
        c.courseName.toLowerCase().includes(term) ||
        c.department.toLowerCase().includes(term)
      );
    });
  }, [courses, searchTerm, showClosed]);

  // -----------------------------------------------
  // LOADING
  // -----------------------------------------------
  if (loading) {
    return (
      <div className="py-10 px-[30px]">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------
  return (
    <div className="py-10 px-[30px]">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Available Courses</h1>
          <p className="text-gray-600 text-sm">
            Browse tutoring courses and view available class groups.
          </p>
        </div>

        {/* STATUS TOGGLE */}
        <div className="text-sm flex flex-col items-center md:items-end gap-2">
          <span className="font-semibold text-gray-700">Course Status</span>
          <div className="inline-flex rounded-full border border-gray-300 bg-white overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setShowClosed(false)}
              className={`px-4 py-1 font-medium ${
                !showClosed
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Active
            </button>

            <button
              type="button"
              onClick={() => setShowClosed(true)}
              className={`px-4 py-1 border-l font-medium ${
                showClosed
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full max-w-xl mx-auto mb-8">
        <SearchBar
          placeholder="Find Course Here..."
          value={searchTerm}
          onChange={(v) => setSearchTerm(v)}
        />
      </div>

      {/* COURSE CARDS */}
      {filteredCourses.length === 0 ? (
        <p className="text-gray-600">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filteredCourses.map((course) => {
            // ---- Tutor normalization & ID -> name mapping ----
            const parsed = Array.isArray(course.tutors)
              ? course.tutors
              : course.tutors
              ? course.tutors.replace(/[\[\]']/g, "").split(",").map((x) => x.trim())
              : [];

            const resolvedTutors = parsed.map((t) => tutorNameMap[t] || t);

            return (
              <ProgramCourseCard
                key={course._id}
                {...course}
                tutors={resolvedTutors}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
