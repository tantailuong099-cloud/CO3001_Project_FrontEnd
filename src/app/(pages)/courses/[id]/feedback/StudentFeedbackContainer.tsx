"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import StudentFeedbackForm from "@/app/components/form/StudentFeedbackForm";

interface Tutor {
  _id: string;
  name: string;
}

export default function StudentFeedbackContainer({ courseId }: { courseId: string }) {
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        // 1️⃣ Fetch class detail
        const res = await fetch(`${API_URL}/api/matching/${courseId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();

        // 2️⃣ Fetch tutors (ID → name)
        const tutorRes = await fetch(`${API_URL}/api/user/role/Tutor`, {
          credentials: "include",
        });
        const tutorJson = await tutorRes.json();
        const tutorList: Tutor[] = tutorJson.data || tutorJson;

        // 3️⃣ Build map { id → name }
        const tutorNameMap: Record<string, string> = {};
        tutorList.forEach((t) => (tutorNameMap[t._id] = t.name));

        // 4️⃣ Replace tutor ID with real name
        const enriched = {
          ...data,
          tutorName: tutorNameMap[data.tutor] || data.tutor,
        };

        setCourseDetail(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseInfo();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  if (!courseDetail) {
    return <div className="p-8 text-red-500">Course information not available.</div>;
  }

  return (
    <StudentFeedbackForm
      courseId={courseId}
      courseName={courseDetail.course.courseName}
      tutorName={courseDetail.tutorName}
      classGroup={courseDetail.classGroup}
    />
  );
}
