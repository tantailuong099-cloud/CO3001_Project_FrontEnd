// src/app/(admin)/admin/program/new/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import Select from "react-select";

type CourseStatus = "upcoming" | "registration" | "ongoing" | "completed";

interface Tutor {
  _id: string;
  name: string;
  email: string;
}

interface CourseFormData {
  courseCode: string;
  courseName: string;
  department: string;
  description: string;
  duration: string;
  semester: string;
  registrationStart: string;
  registrationEnd: string;
  courseStart: string;
  courseEnd: string;
  tutors: string[];
  status: CourseStatus;
}

const initialFormData: CourseFormData = {
  courseCode: "",
  courseName: "",
  department: "",
  description: "",
  duration: "15 weeks",
  semester: "",
  registrationStart: "",
  registrationEnd: "",
  courseStart: "",
  courseEnd: "",
  tutors: [],
  status: "upcoming",
};

export default function AddNewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [tutorList, setTutorList] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  
  // Fetch tutors
  useEffect(() => {
    async function fetchTutors() {
      try {
        console.log("Fetching tutors...");
        const res = await fetch(`${BACKEND_URL}/api/user/Tutor`);
        console.log("Fetch response:", res);
        if (!res.ok) throw new Error("Failed to fetch tutors");
        const data = await res.json();
        setTutorList(data);  // <-- actually set the tutor list
        console.log("Tutor data:", data);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      }
    }
    fetchTutors();
  }, []);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTutorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, tutors: selected }));
  };

  const tutorOptions = tutorList.map((tutor) => ({
    value: tutor._id,
    label: `${tutor.name} (${tutor.email})`,
  }));

  // Handler for react-select
  const handleTutorSelectChange = (selected: any) => {
    setFormData({
      ...formData,
      tutors: selected ? selected.map((s: any) => s.value) : [],
    });
  };

  const handleGoBack = () => router.push("/admin/program");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tutors.length) {
      alert("Please select at least one tutor.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/course/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create course");
      alert("Course and class groups created successfully!");
      router.push("/admin/program");
    } catch (err) {
      console.error(err);
      alert("Error creating course. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 px-[30px] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Course</h1>
          <p className="text-gray-600 text-sm font-medium">Admin / Courses / New</p>
        </div>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition font-medium shadow-sm border border-gray-300"
        >
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                placeholder="CO3001"
              />
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                placeholder="Computer Networks"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                placeholder="Computer Science"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
                placeholder="Brief description"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="2025 Spring"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="15 weeks"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Registration Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration Start</label>
              <input
                type="date"
                name="registrationStart"
                value={formData.registrationStart}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Registration End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registration End</label>
              <input
                type="date"
                name="registrationEnd"
                value={formData.registrationEnd}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Course Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Start</label>
              <input
                type="date"
                name="courseStart"
                value={formData.courseStart}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Course End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course End</label>
              <input
                type="date"
                name="courseEnd"
                value={formData.courseEnd}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              />
            </div>

            {/* Tutors Multi-Select */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tutors (one class group per tutor)
              </label>
              <Select
                isMulti
                options={tutorOptions}
                value={tutorOptions.filter((opt) => formData.tutors.includes(opt.value))}
                onChange={handleTutorSelectChange}
                className="basic-multi-select text-gray-700"
                classNamePrefix="select"
                placeholder="Select tutors..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
              >
                <option value="upcoming">Upcoming</option>
                <option value="registration">Registration</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 rounded-b-xl flex justify-end gap-3">
            <button
              type="button"
              onClick={handleGoBack}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition font-medium shadow-sm border border-gray-300 disabled:opacity-50"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm disabled:opacity-50 disabled:bg-blue-400"
            >
              <Save size={18} /> {isLoading ? "Saving..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
