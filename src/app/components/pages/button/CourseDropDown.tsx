'use client';

export default function CourseDropDown() {
    return (
        <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-md mb-6 border border-gray-300">
            <select className="px-4 py-1.5 text-sm font-semibold bg-white border border-gray-400 rounded-md hover:bg-gray-100">
                <option>ALL</option>
                <option>IN PROGRESS</option>
                <option>PAST</option>
                <option>FUTURE</option>
            </select>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="flex-grow px-3 py-1.5 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-3 py-1.5 text-sm bg-white border border-gray-400 rounded-md focus:outline-none">
                <option>short by short name</option>
                <option>short by course name</option>
                <option>short by last accessed</option>
            </select>
        </div>
    );
}