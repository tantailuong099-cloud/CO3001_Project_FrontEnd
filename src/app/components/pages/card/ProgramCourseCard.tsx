"use client";

import { FaBookOpen, FaCalendarAlt, FaBuilding, FaUsers } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProgramCourseCardProps {
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
  tutors: string[] | string;
  status: string; // created, upcoming, registration, ongoing, completed
  classGroups?: string[] | string;
}

export default function ProgramCourseCard({
  _id,
  courseCode,
  courseName,
  department,
  semester,
  description,
  duration,
  capacity,
  registrationStart,
  registrationEnd,
  courseStart,
  courseEnd,
  tutors,
  status,
  classGroups
}: ProgramCourseCardProps) {
  const router = useRouter();

  // Normalize tutors into array of strings
  const tutorList: string[] = Array.isArray(tutors)
    ? tutors
    : tutors
    ? [String(tutors)]
    : [];

  const groupList: string[] = Array.isArray(classGroups)
  ? classGroups
  : typeof classGroups === "string"
  ? classGroups.replace(/[\[\]']/g, "").split(",").map((g) => g.trim())
  : [];


  // Status badge styling
  const statusStyles: Record<string, string> = {
    created: "bg-gray-200 text-gray-700",
    upcoming: "bg-yellow-200 text-yellow-800",
    registration: "bg-green-200 text-green-800",
    ongoing: "bg-blue-200 text-blue-800",
    completed: "bg-red-200 text-red-800",
  };

  const statusLabel = status?.toUpperCase() || "UNKNOWN";

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all p-6">

      {/* TITLE + STATUS BADGE */}
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {courseCode} — {courseName}
        </h2>

        {/* Status badge */}
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ml-4 ${statusStyles[status]}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* META + CLASS GROUPS ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-3">

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FaBookOpen className="text-blue-600" /> {semester}
          </span>
          <span className="flex items-center gap-1">
            <FaBuilding className="text-green-600" /> {department}
          </span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-orange-500" /> {duration}
          </span>
        </div>

        {/* CLASS GROUPS INLINE WITH META */}
        {groupList.length > 0 && (
          <div className="flex items-center gap-2 mt-3 md:mt-0 text-sm font-medium text-gray-700">
            <FaUsers className="text-purple-600" />
            <span>{groupList.join(" · ")}</span>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-gray-700 text-sm mt-4 mb-4 line-clamp-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* DATE BLOCKS + TUTORS + CAPACITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 mb-4">

        {/* Registration Period */}
        <div className="space-y-1">
          <h4 className="font-semibold">Registration Period</h4>
          <p className="text-gray-600">
            {new Date(registrationStart).toLocaleDateString()} →{" "}
            {new Date(registrationEnd).toLocaleDateString()}
          </p>
        </div>

        {/* Course Duration */}
        <div className="space-y-1">
          <h4 className="font-semibold">Course Duration</h4>
          <p className="text-gray-600">
            {new Date(courseStart).toLocaleDateString()} →{" "}
            {new Date(courseEnd).toLocaleDateString()}
          </p>
        </div>

        {/* Tutors */}
        <div className="space-y-1">
          <h4 className="font-semibold">Tutors</h4>
          <p className="text-gray-700">
            {tutorList.length > 0 ? tutorList.join(", ") : "—"}
          </p>
        </div>

        {/* Capacity */}
        <div className="space-y-1">
          <h4 className="font-semibold">Capacity</h4>
          <p className="text-gray-700">{capacity} students</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-4 mt-6 text-sm text-gray-700">
        <button
          onClick={() => router.push(`/program/${_id}`)}
          className="mt-3 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Class Groups
        </button>
      </div>
    </div>
  );
}
