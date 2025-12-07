'use client';

import FeedbackCard from "@/app/components/pages/card/FeedbackCard";

interface TutorFeedbackViewProps {
  initialFeedbacks: any[];
}

export default function TutorFeedbackView({ initialFeedbacks }: TutorFeedbackViewProps) {
  // Sau này bạn có thể thêm state để lọc, sắp xếp feedbacks ở đây
  // const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">View feedback of student</h2>
        <select className="border border-gray-400 rounded px-3 py-2 text-sm bg-white">
          <option>Filter by Rate</option>
          {/* Các option lọc */}
        </select>
      </div>

      {initialFeedbacks.length === 0 ? (
        <p className="text-gray-600">No feedbacks have been submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialFeedbacks.map((fb) => (
            <FeedbackCard key={fb._id} feedback={fb} />
          ))}
        </div>
      )}
    </div>
  );
}