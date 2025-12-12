// CO3001_Project_FrontEnd_main\src\app\components\pages\card\AdminProgramCard.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ViewButton from "../button/ViewButton";
import EditButton from "../button/EditButton";
import DeleteButton from "../button/DeleteButton";

// Map backend status to UI display
export const statusMap: Record<
  "upcoming" | "registration" | "ongoing" | "completed",
  { label: string; classes: string }
> = {
  upcoming: {
    label: "Upcoming",
    classes: "bg-yellow-100 text-yellow-800",
  },
  registration: {
    label: "Registration",
    classes: "bg-green-100 text-green-800",
  },
  ongoing: {
    label: "Ongoing",
    classes: "bg-blue-100 text-blue-800",
  },
  completed: {
    label: "Completed",
    classes: "bg-gray-300 text-gray-700",
  },
};

export interface AdminProgramCardProps {
  classGroup: {
    id: string; // maps to _id from backend
    courseCode: string;
    courseName?: string;
    department?: string;
    tutor?: string;
    semester?: string;
    classGroup: string;
    registeredCount: number;
    capacity?: number;
    sessions: { day: string; startTime: string; endTime: string }[];
    status?: string | null;
    updatedAt?: string;
  };
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AdminProgramCard({
  classGroup,
  onView,
  onEdit,
  onDelete,
}: AdminProgramCardProps) {
  const {
    id,
    courseCode,
    courseName,
    department = "—",
    tutor,
    semester = "—",
    classGroup: group,
    registeredCount,
    capacity,
    sessions = [],
    status,
    updatedAt,
  } = classGroup;

  const router = useRouter();
  const statusMap: Record<string, { label: string; classes: string }> = {
    upcoming:      { label: "Upcoming",     classes: "bg-yellow-100 text-yellow-800" },
    registration:  { label: "Registration", classes: "bg-green-100 text-green-800" },
    ongoing:       { label: "Ongoing",      classes: "bg-blue-100 text-blue-800" },
    completed:     { label: "Completed",    classes: "bg-gray-300 text-gray-700" },
  };

  const safeStatus = status?.toLowerCase() || "unknown";

  const statusInfo = statusMap[safeStatus] || {
    label: safeStatus.toUpperCase(),
    classes: "bg-gray-200 text-gray-600"
  };



  const handleView = () => router.push(`/admin/program/${courseCode}/${group}`);
  const handleEdit = () => router.push(`/admin/program/edit/${courseCode}/${group}`);

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition">
      <td className="px-4 py-3 font-medium text-gray-900">{courseCode}</td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-semibold">{courseName}</span>
          <span className="text-xs text-gray-500">{department}</span>
        </div>
      </td>

      <td className="px-4 py-3 text-sm">{tutor ?? "TBD"}</td>

      <td className="px-4 py-3 text-center text-sm">{semester}</td>

      <td className="px-4 py-3 text-center">{group}</td>

      <td className="px-4 py-3 text-center">
        {registeredCount}/{capacity ?? "—"}
      </td>

      <td className="px-4 py-3 text-center">
        {sessions.length > 0
          ? sessions.map((s) => `${s.day} ${s.startTime}-${s.endTime}`).join(", ")
          : "TBD"}
      </td>

      <td className="px-4 py-3 text-center">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.classes}`}>
          {statusInfo.label}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-center text-gray-600">
        {updatedAt ? new Date(updatedAt).toLocaleString() : "—"}
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <ViewButton onClick={handleView} aria-label={`View ${courseName} ${group}`} />
          <EditButton onClick={handleEdit} aria-label={`Edit ${courseCode} ${group}`} />
          <DeleteButton onClick={() => onDelete?.(id)} aria-label={`Delete ${courseCode} ${group}`} />
        </div>
      </td>
    </tr>
  );
}
