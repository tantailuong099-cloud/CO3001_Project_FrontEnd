// import type { Metadata } from "next";
// import FeedbackCard from "@/app/components/pages/card/FeedbackCard";
// import FeedbackSidebar from "@/app/components/pages/sidebar/FeedBackSidebar";
// import { cookies } from "next/headers";
// import { getCurrentUser } from "@/lib/auth";
// import StudentFeedbackForm from "@/app/components/form/StudentFeedbackForm";
// import TutorFeedbackView from "@/app/components/pages/views/TutorFeedbackView";


// export const metadata: Metadata = {
//   title: "FeedBack",
//   description: "Tutor Support System",
// };



// async function getFeedbacksForTutor(tutorId: string) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get('access_token')?.value;
//     if(!token){
//       console.log("No token found, cannot fetch feedbacks.");
//       return [];
//     }

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/tutor/${tutorId}`,
//        {
//         method: 'GET',
//         headers: {
//           'Cookie': `access_token=${token}`
//         },
//         cache: 'no-store',
//        }
//     );

//     if(!response.ok){
//       console.error('Failed to fetch feedbacks:', await response.text());
//       return [];
//     }

//     return response.json();
//   } catch (error){
//     console.error('Error fetching feedbacks:', error);
//     return [];
//   }
// }

// export default async function FeedbackPage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Lấy dữ liệu thật nếu là Tutor
//   let feedbacksData = [];
//   if (userRole === 'Tutor') {
//     feedbacksData = await getFeedbacksForTutor(params.id); // Giả sử id khóa học cũng là id của tutor
//   }

//   // chỉ việc gọi component mới
//   const StudentView = () => ( <StudentFeedbackForm tutorId={id} /> );

//   // Giao diện Tutor giờ đây sẽ dùng dữ liệu thật
//   const TutorView = () => (
//     <div className="p-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold">View feedback of student</h2>
//         {/* <select className="border border-gray-400 rounded px-3 py-2 text-sm bg-white">
//           <option>Rate</option>
//         </select> */}
//       </div>
//       {feedbacksData.length === 0 ? (
//         <p>No feedbacks yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {feedbacksData.map((fb: any) => (
//             <FeedbackCard key={fb._id} feedback={fb} />
//           ))}
//         </div>
//       )}
//     </div>
//   );


//   return (userRole === 'Tutor' ? <TutorView /> : <StudentView />);
// }

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import StudentFeedbackForm from "@/app/components/form/StudentFeedbackForm";
import TutorFeedbackView from "@/app/components/pages/views/TutorFeedbackView";


async function getFeedbacksForTutor(tutorId: string, token: string | undefined) {
  if (!token) return [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/tutor/${tutorId}`,
       {
        method: 'GET',
        headers: { 'Cookie': `access_token=${token}` },
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

async function getCourseDetail(courseId: string, token: string | undefined) {
    if (!token) return null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`, {
             headers: { 'Cookie': `access_token=${token}` },
             cache: 'no-store',
        });
        if(!res.ok) return null;
        return res.json();
    } catch(e) {
        return null;
    }
}

export const metadata: Metadata = {
  title: "FeedBack",
  description: "Tutor Support System",
};

export default async function FeedbackPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const token = cookies().get('access_token')?.value;
  const [currentUser, courseDetail] = await Promise.all([
    getCurrentUser(),
    getCourseDetail(id, token)
  ]);

  if (!currentUser) {
    return <div className="p-8">Session expired. Please log in.</div>;
  }

  if (currentUser.role === 'Tutor') {
    const feedbacksData = await getFeedbacksForTutor(id, token);
    return <TutorFeedbackView initialFeedbacks={feedbacksData} />;
  }
  
  if (currentUser.role === 'Student') {
    if (!courseDetail) {
      return <div className="p-8">Could not load course information.</div>;
    }
    return <StudentFeedbackForm tutorId={id} courseInfo={courseDetail} />;
  }

  return <div className="p-8">You do not have permission to view this page.</div>;
}

