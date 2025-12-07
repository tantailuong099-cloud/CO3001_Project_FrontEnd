"use client";

import { useState } from "react";
import FeedbackCard from "@/app/components/pages/card/FeedbackCard";
import { Star } from "lucide-react";

interface TutorFeedbackViewProps {
  initialFeedbacks: any[];
  courseName: string;
  courseCode: string;
  classGroup: string;
}

export default function TutorFeedbackView({
  initialFeedbacks,
  courseName,
  courseCode,
  classGroup,
}: TutorFeedbackViewProps) {
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  // Lọc feedback theo rating
  const filteredFeedbacks =
    filterRating === "all"
      ? initialFeedbacks
      : initialFeedbacks.filter((fb) => fb.rating === filterRating);

  // Tính điểm trung bình
  const averageRating =
    initialFeedbacks.length > 0
      ? (
          initialFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
          initialFeedbacks.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="p-8">
      {/* Header Info */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Feedback</h1>
        <p className="text-gray-600">
          {courseName} ({courseCode}) - Group: {classGroup}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500">
            Overall Rating:
          </span>
          <div className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
            <Star size={16} fill="currentColor" className="mr-1" />
            {averageRating} / 5
          </div>
          <span className="text-sm text-gray-400">
            ({initialFeedbacks.length} reviews)
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Reviews List</h2>
        <select
          value={filterRating}
          onChange={(e) =>
            setFilterRating(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars (Excellent)</option>
          <option value="4">4 Stars (Good)</option>
          <option value="3">3 Stars (Average)</option>
          <option value="2">2 Stars (Poor)</option>
          <option value="1">1 Star (Very Poor)</option>
        </select>
      </div>

      {/* Feedback Grid */}
      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No feedbacks found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.map((fb) => (
            <FeedbackCard key={fb._id} feedback={fb} />
          ))}
        </div>
      )}
    </div>
  );
}
