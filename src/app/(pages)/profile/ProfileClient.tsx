"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    UserCircle2,
    Mail,
    Building,
    GraduationCap,
    BookOpen,
    Clock,
    Calendar,
    Loader2,
    Users,
    FileText,
} from "lucide-react";
import { api } from "@/app/services/api";
import {
    userApi,
    parseStringArray,
    parseConstraints,
    type Student,
    type Tutor,
    type User,
    type TutorConstraint,
} from "@/app/services/userApi";

// Interface for verify response
interface VerifyResponse {
    userId: string;
    email: string;
    role: string;
}

// Helper Components
const InfoSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);

const InfoRow = ({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) => (
    <div className="flex items-center gap-3 py-2">
        <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <div>
            <span className="text-sm text-gray-500">{label}</span>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

export default function ProfileClient() {
    const router = useRouter();
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);

                // Step 1: Verify user and get userId
                const verifyResponse = await api.post<VerifyResponse>(
                    "/api/auth/verify"
                );
                const { userId } = verifyResponse;

                if (!userId) {
                    throw new Error("Authentication failed. Could not get user ID.");
                }

                // Step 2: Fetch user profile by ID
                const userData = await userApi.getUserById(userId);
                if (!userData) {
                    throw new Error("User not found");
                }
                setProfile(userData);
            } catch (err: unknown) {
                console.error("Failed to fetch profile:", err);
                setError("Could not load your profile. Please try logging in again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short",
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    // Error state
    if (error || !profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <p className="text-red-500 font-semibold">{error || "Profile not found"}</p>
                <button
                    onClick={() => router.push("/login")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    // Role-specific data
    const isStudent = profile.role === "Student";
    const isTutor = profile.role === "Tutor";

    // Parse data for display
    const studentData = isStudent ? (profile as Student) : null;
    const tutorData = isTutor ? (profile as Tutor) : null;

    // Parse array fields
    const enrolledCourses = studentData
        ? parseStringArray(studentData.enrolledCourses)
        : [];
    const assignedCourses = tutorData
        ? parseStringArray(tutorData.assignedCourses)
        : [];
    const constraints = tutorData
        ? parseConstraints(tutorData.constraints)
        : [];
    const sharedMaterials = tutorData
        ? parseStringArray(tutorData.sharedMaterial)
        : [];

    // Role badge color
    const getRoleBadgeColor = () => {
        if (isStudent) return "bg-blue-100 text-blue-700";
        if (isTutor) return "bg-green-100 text-green-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserCircle2 className="w-16 h-16 text-purple-400" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getRoleBadgeColor()}`}
                            >
                                {profile.role}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* User Details */}
                        <InfoSection title="User Details">
                            <div className="space-y-1">
                                <InfoRow icon={Mail} label="Email" value={profile.email} />

                                {isStudent && studentData && (
                                    <>
                                        <InfoRow
                                            icon={GraduationCap}
                                            label="Student ID"
                                            value={studentData.studentId || "N/A"}
                                        />
                                        <InfoRow
                                            icon={Building}
                                            label="Major"
                                            value={studentData.major || "N/A"}
                                        />
                                    </>
                                )}

                                {isTutor && tutorData && (
                                    <>
                                        <InfoRow
                                            icon={GraduationCap}
                                            label="Tutor ID"
                                            value={tutorData.tutorId || "N/A"}
                                        />
                                        <InfoRow
                                            icon={Building}
                                            label="Department"
                                            value={tutorData.department || "N/A"}
                                        />
                                        <InfoRow
                                            icon={Users}
                                            label="Max Students"
                                            value={tutorData.maxStudents?.toString() || "N/A"}
                                        />
                                    </>
                                )}
                            </div>
                        </InfoSection>

                        {/* Courses Section */}
                        <InfoSection title={isStudent ? "Enrolled Courses" : "Assigned Courses"}>
                            {(isStudent ? enrolledCourses : assignedCourses).length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {(isStudent ? enrolledCourses : assignedCourses).map(
                                        (course, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                            >
                                                {course}
                                            </span>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No courses found.</p>
                            )}
                        </InfoSection>

                        {/* Student Grades */}
                        {isStudent && studentData?.subjects && studentData.subjects.length > 0 && (
                            <InfoSection title="Academic Performance">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 px-3 font-semibold text-gray-600">
                                                    Subject
                                                </th>
                                                <th className="text-center py-2 px-3 font-semibold text-gray-600">
                                                    Midterm
                                                </th>
                                                <th className="text-center py-2 px-3 font-semibold text-gray-600">
                                                    Final
                                                </th>
                                                <th className="text-center py-2 px-3 font-semibold text-gray-600">
                                                    Project
                                                </th>
                                                <th className="text-center py-2 px-3 font-semibold text-gray-600">
                                                    Participation
                                                </th>
                                                <th className="text-center py-2 px-3 font-semibold text-gray-600">
                                                    Final Score
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentData.subjects.map((subject, idx) => (
                                                <tr key={idx} className="border-b border-gray-100">
                                                    <td className="py-2 px-3 font-medium text-gray-800">
                                                        {subject.Subject}
                                                    </td>
                                                    <td className="py-2 px-3 text-center text-gray-600">
                                                        {subject.scores.midterm}
                                                    </td>
                                                    <td className="py-2 px-3 text-center text-gray-600">
                                                        {subject.scores.final}
                                                    </td>
                                                    <td className="py-2 px-3 text-center text-gray-600">
                                                        {subject.scores.project}
                                                    </td>
                                                    <td className="py-2 px-3 text-center text-gray-600">
                                                        {subject.scores.participation}
                                                    </td>
                                                    <td className="py-2 px-3 text-center font-semibold text-blue-600">
                                                        {subject.finalScore.toFixed(1)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </InfoSection>
                        )}

                        {/* Tutor Constraints */}
                        {isTutor && constraints.length > 0 && (
                            <InfoSection title="Availability Schedule">
                                <div className="space-y-2">
                                    {constraints.map((constraint: TutorConstraint, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                        >
                                            <Calendar className="w-5 h-5 text-green-600" />
                                            <span className="font-medium text-gray-800 min-w-[100px]">
                                                {constraint.day}
                                            </span>
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">
                                                {constraint.startTime} - {constraint.endTime}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </InfoSection>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-8">
                        {/* Account Activity */}
                        <InfoSection title="Account Activity">
                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Account Created</span>
                                    <p className="font-medium text-gray-800">
                                        {formatDate(profile.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Last Updated</span>
                                    <p className="font-medium text-gray-800">
                                        {formatDate(profile.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </InfoSection>

                        {/* Tutor Shared Materials */}
                        {isTutor && sharedMaterials.length > 0 && (
                            <InfoSection title="Shared Materials">
                                <div className="space-y-2">
                                    {sharedMaterials.map((material, idx) => (
                                        <a
                                            key={idx}
                                            href={material}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                                        >
                                            <FileText className="w-4 h-4" />
                                            Material {idx + 1}
                                        </a>
                                    ))}
                                </div>
                            </InfoSection>
                        )}

                        {/* Quick Links */}
                        <InfoSection title="Quick Links">
                            <div className="space-y-2">
                                <a
                                    href="/courses"
                                    className="text-blue-600 hover:underline block text-sm"
                                >
                                    View All Courses
                                </a>
                                <a
                                    href="/materials"
                                    className="text-blue-600 hover:underline block text-sm"
                                >
                                    Browse Materials
                                </a>
                            </div>
                        </InfoSection>
                    </div>
                </main>
            </div>
        </div>
    );
}
