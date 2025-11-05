"use client";

import { CalendarDays, MapPin, User, BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import React from "react";

interface ProgramSummaryProps {
  lecturer: string;
  credit: number;
  startDate: string;
  duration: string;
  sessionType: string;
  location?: string;
  status: string;
  totalStudents: number;
  attendanceRate: number;
}

export default function ProgramSummary({
  lecturer,
  credit,
  startDate,
  duration,
  sessionType,
  location,
  status,
  totalStudents,
  attendanceRate,
}: ProgramSummaryProps) {
  const statusClasses =
    status === "Ongoing"
      ? "bg-blue-100 text-blue-800"
      : status === "Completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center gap-2">
          <User className="text-blue-500" size={18} />
          <span><strong>Lecturer:</strong> {lecturer}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="text-green-500" size={18} />
          <span><strong>Credits:</strong> {credit}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="text-purple-500" size={18} />
          <span><strong>Start Date:</strong> {startDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-500" size={18} />
          <span><strong>Duration:</strong> {duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-red-500" size={18} />
          <span>
            <strong>Type:</strong> {sessionType}{" "}
            {sessionType === "Offline" && `– ${location}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
            >
              {status}
            </span>
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-700">
          <Users className="text-indigo-500" size={18} />
          <span><strong>Registered Students:</strong> {totalStudents}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <CheckCircle className="text-emerald-500" size={18} />
          <span><strong>Attendance Rate:</strong> {attendanceRate}%</span>
        </div>
      </div>
    </div>
  );
}
