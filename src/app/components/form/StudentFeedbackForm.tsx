// 'use client';

// import { useState } from 'react';
// import { api } from '@/app/services/api';


// export default function StudentFeedbackForm({ tutorId} : {tutorId: string}) {
//     const [content, setContent] = useState('');
//     const [rating, setRating] = useState(5);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         setSuccess('');
//         try {
//             const response = await api.post('/api/feedback', {
//                 content,
//                 rating,
//                 tutor: tutorId,
//             });
//             console.log('Full API Response Object:', response);

//             if (!response) {
//                 throw new Error('Something went wrong');
//             }
//             // Nếu thành công
//             setSuccess('Feedback submitted successfully!');
//             setContent('');
//             setRating(5);
//         } catch (err: any) {
//             setError(err.response?.data?.message || err.message || 'An unknown error occurred');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="p-8">
//             <h2 className="text-xl font-bold mb-4">VÕ THỊ NGỌC CHÂU - CLASS CC01 - 05/09 - 12:00 PM</h2>
//             <div className="mt-6">
//                 <label htmlFor="feedback-content" className="block text-md font-semibold text-gray-700">How was the class and the teacher?</label>
//                 <textarea
//                     id="feedback-content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="w-full mt-2 p-3 border border-gray-400 rounded-md h-40"
//                     placeholder="Enter comments here....."
//                     required
//                 ></textarea>
//             </div>
//             <div className="mt-6">
//                 <label className="block text-md font-semibold text-gray-700 mb-3">Rating your satisfaction from 1 to 5:</label>
//                 <div className="flex space-x-8">
//                     {[1, 2, 3, 4, 5].map((r, index) => (
//                         <div key={r} className="flex items-center">
//                             <input type="radio" id={`rating-${r}`} name="rating" value={r} checked={rating === r} onChange={() => setRating(r)} />
//                             <label htmlFor={`rating-${r}`} className="ml-2 text-sm">
//                                 <p className="font-semibold">{r}</p>
//                                 <p className="text-gray-600">{['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][index]}</p>
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="mt-8">
//                 <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50">
//                     {isLoading ? 'Submitting...' : 'Submit'}
//                 </button>
//                 {success && <p className="text-green-600 mt-2">{success}</p>}
//                 {error && <p className="text-red-600 mt-2">{error}</p>}
//             </div>
//         </form>
//     );
// }

'use client';

import { useState } from 'react';
import { api } from '@/app/services/api';

// Định nghĩa kiểu dữ liệu cho course detail để component biết nó nhận gì
interface CourseInfo {
  courseName: string;
  courseCode: string;
}

interface StudentFeedbackFormProps {
  tutorId: string;
  courseInfo: CourseInfo;
}

export default function StudentFeedbackForm({ tutorId, courseInfo }: StudentFeedbackFormProps) {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await api.post('/api/feedback', {
                content,
                rating,
                tutor: tutorId,
            });

            if (!response) {
                throw new Error('No response from server');
            }
            
            setSuccess('Feedback submitted successfully!');
            setContent('');
            setRating(5);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-xl font-bold mb-4">
                Feedback for: {courseInfo.courseName} ({courseInfo.courseCode})
            </h2>

            <div className="mt-6">
                <label htmlFor="feedback-content" className="block text-md font-semibold text-gray-700">How was the class and the teacher?</label>
                <textarea
                    id="feedback-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mt-2 p-3 border border-gray-400 rounded-md h-40"
                    placeholder="Enter comments here....."
                    required
                ></textarea>
            </div>
            <div className="mt-6">
                <label className="block text-md font-semibold text-gray-700 mb-3">Rating your satisfaction from 1 to 5:</label>
                <div className="flex space-x-8">
                    {[1, 2, 3, 4, 5].map((r, index) => (
                        <div key={r} className="flex items-center">
                            <input type="radio" id={`rating-${r}`} name="rating" value={r} checked={rating === r} onChange={() => setRating(r)} />
                            <label htmlFor={`rating-${r}`} className="ml-2 text-sm">
                                <p className="font-semibold">{r}</p>
                                <p className="text-gray-600">{['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][index]}</p>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <button type="submit" disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                {success && <p className="text-green-600 mt-2">{success}</p>}
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>
        </form>
    );
}
