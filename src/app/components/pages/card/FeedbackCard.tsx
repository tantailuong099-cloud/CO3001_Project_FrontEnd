import { Star } from 'lucide-react';

// Kiểu dữ liệu cho một feedback
interface FeedbackProps {
  id: string;
  author: string; // 'Anonymous' hoặc tên sinh viên
  content: string;
  rating: number;
}

export default function FeedbackCard({ feedback }: { feedback: FeedbackProps }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-full">
      <div>
        <p className="font-semibold text-sm text-gray-800 mb-2">{feedback.author}</p>
        <p className="text-gray-600 text-sm">{feedback.content}</p>
      </div>
      <div className="flex items-center mt-3">
        <Star size={16} className="text-yellow-500" />
        <span className="ml-1 text-sm font-bold text-gray-700">{feedback.rating}</span>
      </div>
    </div>
  );
}