import CourseSidebar from '@/app/components/pages/sidebar/CourseSideBar';
import { getCurrentUser } from '@/lib/auth';
import CourseNav from '@/app/components/pages/nav/CourseNav';
import { cookies } from 'next/headers'; 

async function getCourseDetail(courseId: string) {
    const token = cookies().get('access_token')?.value;
    if (!token) return null; 

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`, {
             headers: { 'Cookie': `access_token=${token}` },
             cache: 'no-store',
        });
        if(!res.ok) {
            console.error(`Failed to fetch course ${courseId}:`, await res.text());
            return null;
        }
        return res.json();
    } catch(e) {
        console.error("Error in getCourseDetail:", e);
        return null;
    }
}

export default async function CourseDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const { id } = params;

    const [currentUser, course] = await Promise.all([
        getCurrentUser(),
        getCourseDetail(id)
    ]);

    if (!currentUser?.role) {
        return <div>Unauthorized or session expired.</div>;
    }
    if (!course) {
        return <div className="p-8">Course not found or an error occurred while fetching course details.</div>
    }


    return (
        <div className="flex h-[calc(100vh-128px)]">
            <CourseSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">
                        {course.courseName} ({course.courseCode})
                    </h1>
                    
                    <CourseNav courseId={id} userRole={currentUser.role} />
                </div>
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}

// import { getCurrentUser } from '@/lib/auth';
// import CourseNav from '@/app/components/pages/nav/CourseNav'; // 👈 THÊM LẠI NGHI PHẠM 2

// export default async function CourseDetailLayout({
//     children,
//     params,
// }: {
//     children: React.ReactNode;
//     params: { id: string };
// }) {
//     const { id } = params;
//     const currentUser = await getCurrentUser();

//     if (!currentUser?.role) {
//         return <div>Unauthorized</div>;
//     }

//     return (
//         <div>
//             <div style={{ border: '2px solid green', padding: '1rem' }}>
//                 <h2>Testing CourseNav:</h2>
//                 {/* THÊM LẠI NGHI PHẠM 2 */}
//                 <CourseNav courseId={id} userRole={currentUser.role} />
//             </div>
//             <main style={{ border: '2px solid blue', padding: '1rem' }}>
//                 {children}
//             </main>
//         </div>
//     );
// }