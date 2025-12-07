// src/app/components/pages/container/TutorFeedbackContainer.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import TutorFeedbackView from "@/app/components/pages/views/TutorFeedbackView";

export default function TutorFeedbackContainer({
  courseId,
}: {
  courseId: string;
}) {
  const [data, setData] = useState<{
    feedbacks: any[];
    courseInfo: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        // Gọi song song 2 API: Lấy thông tin lớp & Lấy danh sách feedback
        const [courseRes, feedbackRes] = await Promise.all([
          fetch(`${API_URL}/api/matching/${courseId}`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/api/feedback/${courseId}`, {
            credentials: "include",
          }),
        ]);

        if (!courseRes.ok) throw new Error("Failed to load course details");
        // Feedback có thể rỗng hoặc lỗi nhẹ, ta vẫn xử lý tiếp
        const feedbackData = feedbackRes.ok ? await feedbackRes.json() : [];
        const courseData = await courseRes.json();

        setData({
          feedbacks: feedbackData,
          courseInfo: courseData,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-red-500">
        Error: {error || "Failed to load data"}
      </div>
    );
  }

  return (
    <TutorFeedbackView
      initialFeedbacks={data.feedbacks}
      courseName={data.courseInfo.course.courseName}
      courseCode={data.courseInfo.courseCode}
      classGroup={data.courseInfo.classGroup}
    />
  );
}
