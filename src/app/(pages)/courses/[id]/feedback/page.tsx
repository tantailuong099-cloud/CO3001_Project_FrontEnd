import type { Metadata } from "next";
import FeedbackCard from "@/app/components/pages/card/FeedbackCard";
import FeedbackSidebar from "@/app/components/pages/sidebar/FeedBackSidebar";
import { cookies } from "next/headers";
import StudentFeedbackForm from "@/app/components/form/StudentFeedbackForm";

export const metadata: Metadata = {
  title: "FeedBack",
  description: "Tutor Support System",
};


const userRole = 'Tutor'; // Thay đổi thành 'Tutor' để xem giao diện của giảng viên

async function getFeedbacksForTutor(tutorId: string) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;
    if(!token){
      console.log("No token found, cannot fetch feedbacks.");
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/tutor/${tutorId}`,
       {
        method: 'GET',
        headers: {
          'Cookie': `access_token=${token}`
        },
        cache: 'no-store',
       }
    );

    if(!response.ok){
      console.error('Failed to fetch feedbacks:', await response.text());
      return [];
    }

    return response.json();
  } catch (error){
    console.error('Error fetching feedbacks:', error);
    return [];
  }
}

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Lấy dữ liệu thật nếu là Tutor
  let feedbacksData = [];
  if (userRole === 'Tutor') {
    feedbacksData = await getFeedbacksForTutor(params.id); // Giả sử id khóa học cũng là id của tutor
  }

  // chỉ việc gọi component mới
  const StudentView = () => ( <StudentFeedbackForm tutorId={id} /> );

  // Giao diện Tutor giờ đây sẽ dùng dữ liệu thật
  const TutorView = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">View feedback of student</h2>
        {/* <select className="border border-gray-400 rounded px-3 py-2 text-sm bg-white">
          <option>Rate</option>
        </select> */}
      </div>
      {feedbacksData.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacksData.map((fb: any) => (
            <FeedbackCard key={fb._id} feedback={fb} />
          ))}
        </div>
      )}
    </div>
  );


  return (userRole === 'Tutor' ? <TutorView /> : <StudentView />);
}

