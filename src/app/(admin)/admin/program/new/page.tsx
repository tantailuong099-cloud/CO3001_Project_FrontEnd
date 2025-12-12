// CO3001_Project_FrontEnd_main\src\app\(admin)\admin\program\new\page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import Select, { components } from "react-select";

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
  capacity: number;
  registrationStart: string;
  registrationEnd: string;
  courseStart: string;
  courseEnd: string;
  tutors: string[];
  classGroups: string[];   // NEW
  groupCount: number;      // NEW
}

const initialFormData: CourseFormData = {
  courseCode: "",
  courseName: "",
  department: "",
  description: "",
  duration: "15 weeks",
  semester: "",
  capacity: 30,
  registrationStart: "",
  registrationEnd: "",
  courseStart: "",
  courseEnd: "",
  tutors: [],
  classGroups: [],
  groupCount: 1,
};

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

export default function AddNewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);
  const [tutorList, setTutorList] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // -------------------------------
  // Fetch all tutors (one tutor per course)
  // -------------------------------
  useEffect(() => {
    async function fetchTutors() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/user/role/Tutor`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch tutors");
        const data = await res.json();
        setTutorList(data);
      } catch (err) {
        console.error("Failed to fetch tutors:", err);
      }
    }
    fetchTutors();
  }, []);


  // -------------------------------
  // Helper: Generate Class Groups
  // -------------------------------
  const generateGroups = (count: number): string[] => {
    return Array.from({ length: count }, (_, i) => 
      `CC${String(i + 1).padStart(2, "0")}`
    );
  };

  const CheckboxOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />
          {props.label}
        </div>
      </components.Option>
    );
  };


  // -------------------------------
  // Form Change Handlers
  // -------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Special fields that must be numbers
    if (name === "capacity" || name === "groupCount") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    // Auto-fill courseName when entering courseCode
    if (name === "courseCode") {
      const upper = value.toUpperCase();
      setFormData((prev) => ({
        ...prev,
        courseCode: upper,
        courseName: COURSE_NAMES[upper] ?? prev.courseName,
      }));
      return;
    }
    // Default
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTutorSelectChange = (selected: any) => {
    setFormData((prev) => ({
      ...prev,
      tutors: selected ? [selected.value] : [],
    }));
  };


  // Convert weeks to number
  const parseWeeks = (duration: string) =>
    parseInt(duration.split(" ")[0], 10);

  // Format YYYY-MM-DD
  const toDateInputValue = (date: Date) =>
    date.toISOString().split("T")[0];

  // Add days
  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  // Auto-update when registrationStart changes
  const handleRegistrationStartChange = (start: string) => {
    const startDate = new Date(start);
    const registrationEnd = addDays(startDate, 14); // +2 weeks
    const courseStart = registrationEnd; 
    const durationWeeks = parseWeeks(formData.duration);
    const courseEnd = addDays(courseStart, durationWeeks * 7);

    setFormData((prev) => ({
      ...prev,
      registrationStart: start,
      registrationEnd: toDateInputValue(registrationEnd),
      courseStart: toDateInputValue(courseStart),
      courseEnd: toDateInputValue(courseEnd),
    }));
  };

  // Auto-update when duration changes
  const handleDurationChange = (duration: string) => {
    const regEnd = new Date(formData.registrationEnd);
    const start = new Date(formData.courseStart);

    const weeks = parseWeeks(duration);
    const newCourseEnd = addDays(start || regEnd, weeks * 7);

    setFormData((prev) => ({
      ...prev,
      duration,
      courseEnd: toDateInputValue(newCourseEnd),
    }));
  };


  const handleGoBack = () => router.push("/admin/program");

  // -------------------------------
  // Submit Form
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tutors.length) {
      alert("Please select a tutor.");
      return;
    }

    if (formData.groupCount < 1) {
      alert("Number of groups must be at least 1.");
      return;
    }

    setIsLoading(true);

    try {
      const classGroups = generateGroups(formData.groupCount);

      const payload = {
        ...formData,
        classGroups,
        status: "upcoming",
      };
      
      console.log("🔵 SENDING PAYLOAD:", JSON.stringify(payload, null, 2));

      const res = await fetch(`${BACKEND_URL}/api/course/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      console.log("🟠 BACKEND RESPONSE STATUS:", res.status);
      console.log("🟠 BACKEND RESPONSE TEXT:", await res.text());

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


  // -------------------------------
  // Render UI
  // -------------------------------
  const tutorOptions = tutorList.map((tutor) => ({
    value: tutor._id,
    label: `${tutor.name} (${tutor.email})`,
  }));

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
                placeholder="CO3001"
                className="w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-blue-500"
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
                placeholder="Machine Learning"
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
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
                placeholder="Computer Science"
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="2025 Fall">2025 Fall</option>
                <option value="2026 Spring">2026 Spring</option>
              </select>
            </div>

            {/* Description (full width, big textarea) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed course description..."
                rows={10}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500 resize-y"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                min={10}
                max={30}
                value={formData.capacity}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Allowed range: 10–30 students</p>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-blue-500 bg-white"
              >
                <option value="4 weeks">4 weeks</option>
                <option value="6 weeks">6 weeks</option>
                <option value="8 weeks">8 weeks</option>
                <option value="10 weeks">10 weeks</option>
              </select>
            </div>

            {/* Registration Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Start
              </label>
              <input
                type="date"
                name="registrationStart"
                value={formData.registrationStart}
                onChange={(e) => handleRegistrationStartChange(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
            </div>

            {/* Registration End (auto-calculated but editable) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration End
              </label>
              <input
                type="date"
                name="registrationEnd"
                value={formData.registrationEnd}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
            </div>

            {/* Course Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Start
              </label>
              <input
                type="date"
                name="courseStart"
                value={formData.courseStart}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
            </div>

            {/* Course End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course End
              </label>
              <input
                type="date"
                name="courseEnd"
                value={formData.courseEnd}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
            </div>


            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tutors (select multiple)
            </label>

            <Select
              options={tutorOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option: CheckboxOption }}
              value={tutorOptions.filter((opt) => formData.tutors.includes(opt.value))}
              onChange={(selectedOptions) => {
                setFormData((prev) => ({
                  ...prev,
                  tutors: selectedOptions.map((opt: any) => opt.value),
                }));
              }}
              placeholder="Select tutors..."
              className="text-gray-800"
              classNamePrefix="react-select"
            />
          </div>



            {/* Number of Groups */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Groups
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={formData.groupCount}
                onChange={(e) =>
                  setFormData({ ...formData, groupCount: Number(e.target.value) })
                }
                className="w-full rounded-md border-gray-300 shadow-sm text-gray-700 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Groups will be auto-generated (A, B, C…)
              </p>

              {/* Preview groups */}
              {formData.groupCount > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-blue-700">
                  {generateGroups(formData.groupCount).map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-blue-100 rounded-full font-semibold"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>


            {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>

                <select
                  name="status"
                  value="upcoming"
                  disabled
                  className="w-full rounded-md border-gray-300 text-gray-700 bg-gray-100 shadow-sm"
                >
                  <option value="upcoming">Upcoming</option>
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  Status is automatically set to Upcoming for new courses.
                </p>
              </div>
          </div>


          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 rounded-b-xl flex justify-end gap-3">
            <button
              type="button"
              onClick={handleGoBack}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <X size={18} /> Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-400"
            >
              <Save size={18} /> {isLoading ? "Saving..." : "Save Course"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}