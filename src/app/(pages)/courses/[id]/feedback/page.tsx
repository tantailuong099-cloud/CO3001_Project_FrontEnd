import type { Metadata } from "next";
import FeedbackCard from "@/app/components/pages/card/FeedbackCard";
import FeedbackSidebar from "@/app/components/pages/sidebar/FeedBackSidebar";

export const metadata: Metadata = {
  title: "FeedBack",
  description: "Tutor Support System",
};


const userRole = 'Tutor'; // Thay đổi thành 'Tutor' để xem giao diện của giảng viên

const feedbacksData = [
  { id: '1', author: 'Lương Tấn Tài', content: 'Please give me more bonus', rating: 3 },
  { id: '2', author: 'Anonymous', content: 'Good lesson', rating: 5 },
  { id: '3', author: 'Anonymous', content: 'You are my angel', rating: 5 },
  { id: '4', author: 'Lương Tấn Tài', content: "I can't understand anything", rating: 1 },
  { id: '5', author: 'Anonymous', content: 'Good lesson', rating: 4 },
  { id: '6', author: 'Anonymous', content: 'You are my angel', rating: 5 },
  { id: '7', author: 'Lương Tấn Tài', content: 'Can I sleep', rating: 3 },
  { id: '8', author: 'Anonymous', content: 'Good lesson', rating: 5 },
  { id: '9', author: 'Anonymous', content: 'You are my angel', rating: 4 },
];

export default function FeedbackPage({ params }: { params: { id: string } }) {

  // Giao diện cho Student
  const StudentView = () => (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">VÕ THỊ NGỌC CHÂU - CLASS CC01 - 05/09 - 12:00 PM</h2>
      <div className="mt-6">
        <label className="block text-md font-semibold text-gray-700">How was the class and the teacher?</label>
        <textarea
          className="w-full mt-2 p-3 border border-gray-400 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter comments here....."
        ></textarea>
      </div>
      <div className="mt-6">
        <label className="block text-md font-semibold text-gray-700 mb-3">Rating your satisfaction from 1 to 5:</label>
        <div className="flex space-x-8">
          {[1, 2, 3, 4, 5].map((rating, index) => (
            <div key={rating} className="flex items-center">
              <input type="radio" id={`rating-${rating}`} name="rating" value={rating} className="h-4 w-4" defaultChecked={rating === 5} />
              <label htmlFor={`rating-${rating}`} className="ml-2 text-sm">
                <p className="font-semibold">{rating}</p>
                <p className="text-gray-600">{['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][index]}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 space-x-3">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Submit</button>
        <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400">Cancel</button>
      </div>
    </div>
  );

  // Giao diện cho Tutor
  const TutorView = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">View feedback of student</h2>
        <select className="border border-gray-400 rounded px-3 py-2 text-sm bg-white">
          <option>Rate</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacksData.map(fb => (
          <FeedbackCard key={fb.id} feedback={fb} />
        ))}
      </div>
      {/* Pagination (Tạm thời) */}
      <div className="flex justify-center items-center mt-8 text-sm">
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">← Previous</a>
        <a href="#" className="px-3 py-1 bg-blue-500 text-white rounded-md">1</a>
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">2</a>
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">3</a>
        <span className="px-3 py-1">...</span>
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">10</a>
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">11</a>
        <a href="#" className="px-3 py-1 hover:bg-gray-200 rounded-md">Next →</a>
      </div>
    </div>
  );

  return (userRole === 'Tutor' ? <TutorView /> : <StudentView />);
}

