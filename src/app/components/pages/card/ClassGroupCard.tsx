"use client";

import { FaClock, FaUser } from "react-icons/fa";

interface Session {
  day: string;
  startTime: string;
  endTime: string;
}

interface ClassGroupCardProps {
  group: string;
  tutor: string | null;
  sessions: Session[];
  registeredCount: number;
  capacity: number;
  status: string;
  canRegister: boolean;
  onRegister?: () => void;
}

const statusColors: Record<string, string> = {
  created: "bg-gray-200 text-gray-700",
  upcoming: "bg-yellow-200 text-yellow-800",
  registration: "bg-green-200 text-green-800",
  active: "bg-green-200 text-green-800",
  ongoing: "bg-blue-200 text-blue-800",
  closed: "bg-red-200 text-red-800",
  completed: "bg-red-200 text-red-800",
};

export default function ClassGroupCard({
  group,
  tutor,
  sessions,
  registeredCount,
  capacity,
  status,
  canRegister,
  onRegister,
}: ClassGroupCardProps) {
  return (
    <div className="border rounded-2xl bg-white shadow-sm hover:shadow-md transition-all p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{group}</h2>
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            statusColors[status] || "bg-gray-200"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <hr className="border-gray-200" />

      {/* TUTOR */}
      <div>
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <FaUser className="text-blue-600" /> Tutor
        </h3>
        <p className="text-gray-700 pl-7">
          {tutor || <span className="text-gray-500">Not assigned</span>}
        </p>
      </div>

      {/* SCHEDULE */}
      <div>
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <FaClock className="text-orange-500" /> Schedule
        </h3>
        <div className="pl-7">
          {sessions.length > 0 ? (
            <ul className="space-y-1 text-gray-700">
              {sessions.map((s, i) => (
                <li key={i}>
                  {s.day}: {s.startTime}–{s.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Not scheduled</p>
          )}
        </div>
      </div>

      {/* REGISTERED COUNT */}
      <div>
        <h3 className="font-semibold text-gray-900">Enrollment</h3>
        <p className="text-gray-700 pl-1">
          {registeredCount}/{capacity} students
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* REGISTER BUTTON */}
      <button
        disabled={!canRegister}
        onClick={canRegister ? onRegister : undefined}
        className={`w-full px-5 py-2 rounded-lg text-white font-medium transition-all ${
          canRegister
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {canRegister ? "Register for Class Group" : "Registration Closed"}
      </button>
    </div>
  );
}
