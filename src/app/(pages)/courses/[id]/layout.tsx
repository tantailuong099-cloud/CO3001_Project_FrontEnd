import Link from 'next/link';
import CourseSidebar from '@/app/components/pages/sidebar/CourseSideBar';

export default function CourseDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const { id } = params;

    const userRole = 'Tutor'; // đổi role Tutor để coi giao diện tutor

    const NavigationBar = () => {
        if (userRole === 'Tutor') {
            return (
                <div className="mt-4 flex space-x-2">
                    <Link href={`/courses/${id}`} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm">Document</Link>
                    <button disabled className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm opacity-50 cursor-not-allowed">Manage</button>
                    <Link href={`/courses/${id}/feedback`} className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">Feedback</Link>
                    <button disabled className="px-4 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm opacity-50 cursor-not-allowed">Student Progress</button>
                </div>
            );
        }
        return (
            <div className="mt-4">
                <Link href={`/courses/${id}`} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm mr-2">Course</Link>
                <Link href={`/courses/${id}/feedback`} className="px-5 py-2 text-sm font-semibold bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100">Feedback</Link>
            </div>
        );
    };

    return (
        <div className="flex h-[calc(100vh-128px)]">
            <CourseSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">
                        Data Structure and Algorithm (CO2013)_(CLC_HK251) [CC01]
                    </h1>
                    <NavigationBar />
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}