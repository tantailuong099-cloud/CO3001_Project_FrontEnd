"use client";

import { CalendarDays, MapPin } from "lucide-react";
import React from "react";
import ViewButton from "../button/ViewButton";
import EditButton from "../button/EditButton";
import DeleteButton from "../button/DeleteButton";
import { useRouter } from "next/navigation";

export type CourseStatus = "Ongoing" | "Upcoming" | "Inactive" | "Completed";

export interface AdminProgramCardProps {
  course: {
    id?: string | number;
    code: string;
    name: string;
    credit: number;
    lecturer: string;
    semester: string;
    department: string;
    startDate?: string;
    duration?: string;
    sessionCode?: string;
    sessionType?: "Online" | "Offline";
    location?: string;
    status?: CourseStatus;
    updatedAt?: string;
  };
  onView?: (id?: string | number) => void;
  onEdit?: (id?: string | number) => void;
  onDelete?: (id?: string | number) => void;
}

export default function AdminProgramCard({
  course,
  onView,
  onEdit,
  onDelete,
}: AdminProgramCardProps) {
  const {
    id,
    code,
    name,
    credit,
    lecturer,
    semester,
    department,
    startDate,
    duration,
    sessionCode,
    sessionType = "Offline",
    location = "—",
    status = "Upcoming",
    updatedAt,
  } = course;

  const router = useRouter();
  
  const statusClasses =
    status === "Ongoing"
      ? "bg-blue-100 text-blue-800"
      : status === "Completed"
      ? "bg-green-100 text-green-800"
      : status === "Inactive"
      ? "bg-gray-100 text-gray-700"
      : "bg-yellow-100 text-yellow-800"; // Upcoming

  const sessionTypeClasses =
    sessionType === "Online"
      ? "bg-green-100 text-green-800"
      : "bg-indigo-100 text-indigo-800";

  const handleView = () => {
    // Navigate to program detail page, e.g. /admin/program/[id]
    router.push(`/admin/program/${course.code}`);
  };

  // --- FIX: Added handleEdit function ---
  const handleEdit = () => {
    // Navigate to program edit page, e.g. /admin/program/edit/[id]
    router.push(`/admin/program/edit/${course.code}`);
  };
  // --- END OF FIX ---

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-900">{code}</td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-xs text-gray-500">{department}</span>
        </div>
      </td>

      <td className="px-4 py-3 text-center">{credit}</td>

      <td className="px-4 py-3">
        <div className="text-sm">{lecturer}</div>
      </td>

      <td className="px-4 py-3 text-sm text-center text-gray-700">
        {semester}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarDays size={14} className="text-blue-500" />
          <span>{startDate ?? "TBD"}</span>
        </div>
      </td>

      <td className="px-4 py-3 text-sm">{duration ?? "TBD"}</td>

      <td className="px-4 py-3 text-center font-medium">{sessionCode ?? "—"}</td>

      <td className="px-4 py-3 text-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${sessionTypeClasses}`}
        >
          {sessionType}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-center">
        <div className="flex items-center justify-center gap-2">
          <MapPin size={14} className="text-gray-500" />
          <span className="text-sm text-gray-700">
            {sessionType === "Offline" ? location || "—" : "—"}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
        >
          {status}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-center text-gray-600">
        {updatedAt ?? "—"}
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <ViewButton
            onClick={handleView}
            aria-label={`View details for ${course.name}`}
          />
          {/* --- FIX: Updated onClick to use handleEdit --- */}
          <EditButton
            onClick={handleEdit}
            title="Edit course"
            aria-label={`Edit ${code}`}
          />
          {/* --- END OF FIX --- */}
          <DeleteButton
            onClick={() => onDelete?.(code)}
            title="Delete course"
            aria-label={`Delete ${code}`}
          />
        </div>
      </td>
    </tr>
  );
}

