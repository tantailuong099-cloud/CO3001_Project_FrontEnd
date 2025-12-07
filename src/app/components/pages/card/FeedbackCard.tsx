import { Star, User } from "lucide-react";

export default function FeedbackCard({ feedback }: { feedback: any }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User size={16} />
          </div>
          <div>
            {/* Ẩn danh hoặc hiện tên nếu có populate author */}
            <p className="text-sm font-semibold text-gray-800">Student</p>
            <p className="text-xs text-gray-400">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center text-yellow-500">
          <span className="font-bold mr-1">{feedback.rating}</span>
          <Star size={14} fill="currentColor" />
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {feedback.content}
      </p>
    </div>
  );
}
