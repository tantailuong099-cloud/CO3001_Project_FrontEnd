// CO3001_Project_FrontEnd_main\src\app\(pages)\program\[courseId]\page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ClassGroupCard from "@/app/components/pages/card/ClassGroupCard";

interface Session {
  day: string;
  startTime: string;
  endTime: string;
}

interface Registration {
  _id: string;
  courseCode: string;
  classGroup: string;
  tutor: string | null;
  students: string[];
  registeredCount: number;
  sessions: Session[];
  status: string;
}

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  description?: string;
  duration: string;
  capacity: number;
  classGroups: string[] | string;
  registrationStart: string;
  registrationEnd: string;
  courseStart: string;
  courseEnd: string;
  status: string;
}

function normalizeClassGroups(
  raw: string[] | string | null | undefined
): string[] {
  const result: string[] = [];
  if (!raw) return result;

  const handleOne = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;

    // Case 1: looks like "['CC01', 'CC02']" or '["CC01","CC02"]'
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      trimmed
        .slice(1, -1) // remove [ ]
        .split(",")
        .forEach((part) => {
          const v = part
            .trim()
            .replace(/^['"]/, "") // strip leading ' or "
            .replace(/['"]$/, ""); // strip trailing ' or "
          if (v) result.push(v);
        });
      return;
    }

    // Case 2: a simple value like "CC01"
    result.push(trimmed);
  };

  if (Array.isArray(raw)) {
    raw.forEach((entry) => handleOne(String(entry)));
  } else if (typeof raw === "string") {
    handleOne(raw);
  }

  // Remove duplicates just in case
  return Array.from(new Set(result));
}


export default function CourseGroupsPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [course, setCourse] = useState<Course | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    async function loadData() {
      try {
        const courseRes = await fetch(`${BACKEND_URL}/api/course/${courseId}`, {
          credentials: "include",
        });

        const cjson = await courseRes.json();
        const courseData = cjson.data || cjson;
        setCourse(courseData);
        
        console.log("DEBUG courseData =", courseData);
        console.log("DEBUG courseCode =", JSON.stringify(courseData.courseCode));
        console.log(
          "DEBUG Registration URL =",
          `${BACKEND_URL}/api/matching/registrations?courseCode=${courseData.courseCode}`
        );


        const regRes = await fetch(
          `${BACKEND_URL}/api/matching/registrations?courseCode=${courseData.courseCode}`,
          { credentials: "include" }
        );
        const rjson = await regRes.json();
        const regData = Array.isArray(rjson) ? rjson : (Array.isArray(rjson.data) ? rjson.data : []);

        console.log("DEBUG regRes status =", regRes.status);
        console.log("DEBUG rjson =", rjson);

        setRegistrations(regData);
      } catch (err) {
        console.error("Failed to load course data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [courseId, BACKEND_URL]);

  if (loading || !course) {
    return (
      <div className="py-10 px-[30px]">
        <p>Loading course...</p>
      </div>
    );
  }

  // Normalize class groups
  const groupList: string[] = normalizeClassGroups(course.classGroups);
  console.log("DEBUG groupList =", groupList);

  // Registration timeline
  const today = new Date();
  const start = new Date(course.registrationStart);
  const end = new Date(course.registrationEnd);

  const canRegisterCourse = () => {
    if (course.status === "created") return false;
    if (course.status === "upcoming") return today >= start && today <= end;
    if (course.status === "registration") return true;
    return false;
  };

  const statusColors: Record<string, string> = {
    created: "bg-gray-200 text-gray-700",
    upcoming: "bg-yellow-200 text-yellow-800",
    registration: "bg-green-200 text-green-800",
    ongoing: "bg-blue-200 text-blue-800",
    completed: "bg-red-200 text-red-800",
  };

  return (
    <div className="py-10 px-[30px] space-y-8">

      {/* HEADER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {course.courseCode} — {course.courseName}
          </h1>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              statusColors[course.status] || "bg-gray-200"
            }`}
          >
            {course.status.toUpperCase()}
          </span>
        </div>

        <p className="text-gray-700 max-w-3xl leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* PERIOD INFORMATION */}
      <div className="bg-gray-50 border rounded-xl p-4 space-y-2 max-w-lg">
        <p className="text-gray-800">
          <strong>Registration Period:</strong>{" "}
          {new Date(course.registrationStart).toLocaleDateString()} –{" "}
          {new Date(course.registrationEnd).toLocaleDateString()}
        </p>

        <p className="text-gray-800">
          <strong>Course Period:</strong>{" "}
          {new Date(course.courseStart).toLocaleDateString()} –{" "}
          {new Date(course.courseEnd).toLocaleDateString()}
        </p>
      </div>

      {/* CLASS GROUPS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {groupList.map((group) => {
          const reg = registrations.find((r) => r.classGroup === group);
          if (!reg) return null; // hide empty groups

          return (
            <ClassGroupCard
              key={group}
              group={group}
              tutor={reg?.tutor ?? null}
              sessions={reg?.sessions ?? []}
              students={reg?.students ?? []}
              registeredCount={reg?.registeredCount ?? 0}
              capacity={course.capacity}
              status={reg?.status ?? "created"}
              canRegister={
                reg &&
                (reg.status === "active" || reg.status === "registration") &&
                canRegisterCourse()
              }
              onRegister={() => console.log("Registering for", group)}
            />
          );
        })}
      </div>
    </div>
  );
}
