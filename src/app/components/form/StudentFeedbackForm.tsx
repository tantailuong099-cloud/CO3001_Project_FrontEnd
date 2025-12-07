"use client";

import { useState } from "react";
import { Loader2, Star, Send } from "lucide-react";

interface StudentFeedbackFormProps {
  courseId: string;
  courseName: string;
  tutorName: string;
  classGroup: string;
}

export default function StudentFeedbackForm({
  courseId,
  courseName,
  tutorName,
  classGroup,
}: StudentFeedbackFormProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Để gửi cookie token đi kèm
        body: JSON.stringify({
          content: content,
          rating: rating,
          courseId: courseId, // Gửi courseId theo đúng JSON mẫu
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to submit feedback");
      }

      setSuccess("Thank you! Your feedback has been submitted.");
      setContent("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-blue-700 mb-1">{courseName}</h2>
        <p className="text-gray-600 font-medium mb-6">
          Tutor: {tutorName} - Class: {classGroup}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How would you rate your experience?
            </label>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((r) => (
                <label
                  key={r}
                  className={`cursor-pointer flex flex-col items-center p-3 rounded-lg border transition-all ${
                    rating === r
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={r}
                    checked={rating === r}
                    onChange={() => setRating(r)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-bold text-lg">{r}</span>
                    <Star
                      size={16}
                      fill={rating === r ? "currentColor" : "none"}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {
                      ["Very Poor", "Poor", "Average", "Good", "Excellent"][
                        r - 1
                      ]
                    }
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mb-6">
            <label
              htmlFor="feedback-content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Do you have any comments for the tutor?
            </label>
            <textarea
              id="feedback-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
              placeholder="Write your review here..."
              required
            ></textarea>
          </div>

          {/* Submit Button & Status */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
              {isLoading ? "Submitting..." : "Send Feedback"}
            </button>

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-md text-center text-sm">
                {success}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md text-center text-sm">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
