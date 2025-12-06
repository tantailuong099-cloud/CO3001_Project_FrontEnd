// src/app/(admin)/admin/program/edit/[id]/[sessionId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";

type Session = { day: string; startTime: string; endTime: string };
type RegistrationStatus = "created" | "tutor_assigned" | "active" | "closed";

interface Registration {
  _id: string;
  courseCode: string;
  classGroup: string;
  tutor?: string;
  status: RegistrationStatus;
  students: string[];
  registeredCount: number;
  sessions: Session[];
  updatedAt?: string;
  capacity?: number;
}

interface Course {
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  description?: string;
  capacity?: number;

  registrationStart: string;
  registrationEnd: string;
  courseStart: string;
  courseEnd: string;
}


function safeParse(data: any) {
  if (!data) return [];
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data.replace(/'/g, '"'));
  } catch {
    return [];
  }
}

const isPastDate = (dateStr: string | undefined) => {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
};

export default function EditRegistrationPage() {
  const router = useRouter();
  const params = useParams();
  const { id: courseCode, sessionId: classGroup } = params;

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------- Fetch Data from Backend ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
        const cookie = document.cookie; // send browser cookies automatically

        const [courseRes, regRes] = await Promise.all([
          fetch(`${API_URL}/api/course?courseCode=${courseCode}`, {
            credentials: "include", // include cookies
            headers: { Cookie: cookie },
          }),
          fetch(
            `${API_URL}/api/matching/registrations?courseCode=${courseCode}&classGroup=${classGroup}`,
            {
              credentials: "include",
              headers: { Cookie: cookie },
            }
          ),
        ]);

        if (!courseRes.ok) {
          const text = await courseRes.text();
          console.error("Course fetch failed:", text);
          throw new Error("Failed to fetch course");
        }
        if (!regRes.ok) {
          const text = await regRes.text();
          console.error("Registration fetch failed:", text);
          throw new Error("Failed to fetch registration");
        }

        const courseData: Course[] = await courseRes.json();
        const regData: Registration[] = await regRes.json();
        if (!courseData[0] || !regData[0]) throw new Error("Data not found");

        setCourse(courseData[0]);
        setRegistration({
          ...regData[0],
          sessions: safeParse(regData[0].sessions),
          students: safeParse(regData[0].students),
        });
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseCode, classGroup]);

  // ---------------- Handlers ----------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
    field?: keyof Session
  ) => {
    if (!registration && !course) return;
    const { name, value } = e.target;

    // Editable fields for registration
    if (name === "tutor" || name === "status") {
      setRegistration({ ...registration!, [name]: value });
    }

    // Editable fields for course
    if (name === "description" || name === "capacity") {
      setCourse({ ...course!, [name]: name === "capacity" ? Number(value) : value });
    }

    // Edit the four course dates (registrationStart, registrationEnd, courseStart, courseEnd)
    if (
      name === "registrationStart" ||
      name === "registrationEnd" ||
      name === "courseStart" ||
      name === "courseEnd"
    ) {
      setCourse({ ...course!, [name]: value });
    }

    // Sessions
    if (typeof index === "number" && field) {
      const updatedSessions = [...registration!.sessions];
      updatedSessions[index][field] = value;
      setRegistration({ ...registration!, sessions: updatedSessions });
    }
  };

  const addSession = () => {
    if (!registration) return;
    setRegistration({
      ...registration,
      sessions: [...registration.sessions, { day: "", startTime: "", endTime: "" }],
    });
  };

  const removeSession = (index: number) => {
    if (!registration) return;
    setRegistration({
      ...registration,
      sessions: registration.sessions.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration || !course) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

      // PATCH Registration (explicitly mapped)
      const regRes = await fetch(
        `${API_URL}/api/matching/registrations/${registration._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tutor: registration.tutor,
            status: registration.status,
            sessions: registration.sessions,
            capacity: registration.capacity,
          }),
        }
      );
      if (!regRes.ok) throw new Error("Failed to update registration");

      // PATCH Course (explicitly mapped)
      const courseRes = await fetch(`${API_URL}/api/course/${course.courseCode}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: course.description,
          capacity: course.capacity,
        }),
      });
      if (!courseRes.ok) throw new Error("Failed to update course");

      alert("Changes saved successfully!");
      router.push("/admin/program");
    } catch (err: any) {
      alert(err.message || "Error saving changes");
    }
  };

  const isCourseOver = course && new Date() > new Date(course.courseEnd);

  // ---------------- Loading / Error ----------------
  if (isLoading)
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error || !registration || !course)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">{error || "Data not found"}</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );

  // ---------------- Render Form ----------------
  // ---------------- Render Form ----------------
return (
  <div className="py-10 px-[30px] min-h-screen bg-gray-50 text-gray-900">
    <div className="max-w-4xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {course.courseName}{" "}
            <span className="text-gray-900 text-3xl">({course.courseCode})</span>
          </h1>
          <p className="mt-2">
            <span className="inline-block text-2xl font-bold text-white bg-blue-600 px-4 py-1 rounded-lg shadow-md">
              Class {registration.classGroup}
            </span>
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium"
        >
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl border border-gray-200 p-8 space-y-6">

        {/* ---------------- Registration Info ---------------- */}
        <h2 className="text-xl font-semibold mb-4">Registration Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tutor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutor</label>
            <input
              type="text"
              name="tutor"
              value={registration.tutor || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
              disabled={isCourseOver}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={registration.status}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
              disabled={isCourseOver}
            >
              <option value="created">Created</option>
              <option value="tutor_assigned">Tutor Assigned</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Sessions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sessions</label>
            {registration.sessions.map((s, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Day"
                  value={s.day}
                  onChange={(e) => handleInputChange(e, idx, "day")}
                  className={`px-2 py-1 border border-gray-300 rounded-md w-24 ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
                  disabled={isCourseOver}
                />
                <input
                  type="time"
                  value={s.startTime}
                  onChange={(e) => handleInputChange(e, idx, "startTime")}
                  className={`px-2 py-1 border border-gray-300 rounded-md ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
                  disabled={isCourseOver}
                />
                <input
                  type="time"
                  value={s.endTime}
                  onChange={(e) => handleInputChange(e, idx, "endTime")}
                  className={`px-2 py-1 border border-gray-300 rounded-md ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
                  disabled={isCourseOver}
                />
                {!isCourseOver && (
                  <button type="button" onClick={() => removeSession(idx)} className="text-red-500 font-semibold">X</button>
                )}
              </div>
            ))}
            {!isCourseOver && (
              <button type="button" onClick={addSession} className="text-blue-600 mt-2 font-medium">
                + Add Session
              </button>
            )}
          </div>
        </div>

        {/* ---------------- Course Info ---------------- */}
        <h2 className="text-xl font-semibold mt-6 mb-4">Course Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
            <textarea
              name="description"
              value={course.description || ""}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md resize-y ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
              disabled={isCourseOver}
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={course.capacity || 0}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isCourseOver ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`}
              disabled={isCourseOver}
            />
          </div>

          {/* Registration & Course Dates */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {["registrationStart", "registrationEnd", "courseStart", "courseEnd"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                </label>
                <input
                  type="date"
                  name={field}
                  value={course[field as keyof Course]?.toString().split("T")[0] || ""}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                    isPastDate(course[field as keyof Course]?.toString()) || isCourseOver
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-white text-gray-900"
                  }`}
                  disabled={isPastDate(course[field as keyof Course]?.toString()) || isCourseOver}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Actions ---------------- */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button type="button" onClick={() => router.back()} className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-100 border border-gray-300">
            <X size={18} /> Cancel
          </button>
          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md ${
              isCourseOver ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={isCourseOver}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>

      </form>
    </div>
  </div>
);
}