import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import StudentFeedbackContainer from "./StudentFeedbackContainer";
import TutorFeedbackContainer from "./TutorFeedbackContainer";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Course Feedback System",
};

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Chỉ lấy thông tin User từ Server để check quyền
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="p-8 text-center">Session expired. Please log in.</div>
    );
  }

  // --- GIAO DIỆN TUTOR ---
  if (currentUser.role === "Tutor") {
    return <TutorFeedbackContainer courseId={id} />;
  }

  // --- GIAO DIỆN STUDENT ---
  if (currentUser.role === "Student") {
    return <StudentFeedbackContainer courseId={id} />;
  }

  return <div className="p-8">Unauthorized access.</div>;
}
