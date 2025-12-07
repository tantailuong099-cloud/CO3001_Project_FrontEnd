// src/app/(admin)/admin/program/[id]/[sessionId]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Class Session Detail – Tutor Support System",
  description: "Administrative class overview and management panel",
};

/* -------------------------------------------------------
   HELPERS
-------------------------------------------------------- */
function safeParse(data: any) {
  if (!data) return [];
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data.replace(/'/g, '"'));
  } catch {
    return [];
  }
}

/* -------------------------------------------------------
   SERVER FETCH – Load COURSE + CLASS GROUP (REGISTRATION)
-------------------------------------------------------- */
async function getClassDetail(courseCode: string, classGroup: string) {
  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";
  const API_URL = process.env.API_URL ?? "http://localhost:4000";

  try {
    const [courseRes, regRes] = await Promise.all([
      fetch(`${API_URL}/api/course?courseCode=${courseCode}`, {
        next: { revalidate: 0 },
        credentials: "include",
        headers: { Cookie: cookie },
      }),
      fetch(
        `${API_URL}/api/matching/registrations?courseCode=${courseCode}&classGroup=${classGroup}`,
        {
          next: { revalidate: 0 },
          credentials: "include",
          headers: { Cookie: cookie },
        }
      ),
    ]);

    if (!courseRes.ok || !regRes.ok) return null;

    const courseArray = await courseRes.json();
    const course = Array.isArray(courseArray) ? courseArray[0] : courseArray;
    const registrationArray = await regRes.json();
    const registration = Array.isArray(registrationArray)
      ? registrationArray[0]
      : registrationArray;

    if (!registration) return null;

    return {
      courseCode: course.courseCode,
      courseName: course.courseName,
      semester: course.semester,
      department: course.department,
      description: course.description,
      courseCapacity: course.capacity,

      classGroup: registration.classGroup,
      tutor: registration.tutor,
      registeredCount: registration.registeredCount,
      classCapacity: registration.capacity,
      status: registration.status,
      updatedAt: registration.updatedAt,

      sessions: safeParse(registration.sessions),
      students: safeParse(registration.students), // emails

      // Add these
      courseStart: course.courseStart,
      courseEnd: course.courseEnd,
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

/* -------------------------------------------------------
   SERVER FETCH – Load STUDENTS DETAILS
-------------------------------------------------------- */
async function getStudentsInfo(emails: string[]) {
  if (!emails?.length) return [];

  const hdrs = await headers();
  const cookie = hdrs.get("cookie") ?? "";
  const API_URL = process.env.API_URL ?? "http://localhost:4000";

  try {
    const res = await fetch(
      `${API_URL}/api/user/students?emails=${emails.join(",")}`,
      {
        credentials: "include",
        headers: { Cookie: cookie },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error("Fetch students error:", err);
    return [];
  }
}

/* -------------------------------------------------------
   PAGE COMPONENT – CLASS DETAIL
-------------------------------------------------------- */
export default async function ClassDetailPage({
  params,
}: {
  params: { id: string; sessionId: string };
}) {
  const { id: courseCode, sessionId: classGroup } = await params;

  const info = await getClassDetail(courseCode, classGroup);
  if (!info) return notFound();

  const students = await getStudentsInfo(info.students);

  // ---------- COMPUTE AVERAGES & DISTRIBUTION ----------
  let avgFinal = 0;
  const avgComponents = { midterm: 0, final: 0, project: 0, participation: 0 };
  const dist = { excellent: 0, good: 0, satisfactory: 0, needsImprovement: 0 };
  let count = 0;

  students.forEach((s: any) => {
    const subj = safeParse(s.subjects)?.find(
      (sub: any) => sub.Subject === info.courseName
    );
    if (subj) {
      count++;
      avgFinal += subj.finalScore ?? 0;
      avgComponents.midterm += subj.scores?.midterm ?? 0;
      avgComponents.final += subj.scores?.final ?? 0;
      avgComponents.project += subj.scores?.project ?? 0;
      avgComponents.participation += subj.scores?.participation ?? 0;

      const score = subj.finalScore ?? 0;
      if (score >= 9) dist.excellent++;
      else if (score >= 8) dist.good++;
      else if (score >= 7) dist.satisfactory++;
      else dist.needsImprovement++;
    }
  });

  if (count > 0) {
    avgFinal = (avgFinal / count).toFixed(2);
    avgComponents.midterm = (avgComponents.midterm / count).toFixed(2);
    avgComponents.final = (avgComponents.final / count).toFixed(2);
    avgComponents.project = (avgComponents.project / count).toFixed(2);
    avgComponents.participation = (avgComponents.participation / count).toFixed(
      2
    );
  }

  const distPercent = (key: keyof typeof dist) =>
    count ? ((dist[key] / count) * 100).toFixed(0) : 0;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {info.courseName}{" "}
            <span className="text-gray-900 text-3xl">({info.courseCode})</span>
          </h1>
          <p className="mt-2">
            <span className="inline-block text-2xl font-bold text-white bg-blue-600 px-4 py-1 rounded-lg shadow-md">
              Class {info.classGroup}
            </span>
          </p>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Course Info
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Course:</strong> {info.courseName}
            </li>
            <li>
              <strong>Class Group:</strong> {info.classGroup}
            </li>
            <li>
              <strong>Tutor:</strong> {info.tutor || "Unassigned"}
            </li>
            <li>
              <strong>Department:</strong> {info.department}
            </li>
            <li>
              <strong>Semester:</strong> {info.semester}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{info.status}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Class Stats
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Registered Students:</strong> {info.registeredCount} /{" "}
              {info.courseCapacity}
            </li>
            <li>
              <strong>Average Final Score:</strong> {avgFinal}
            </li>
            <li>
              <strong>Start Date:</strong>{" "}
              {info.courseStart
                ? new Date(info.courseStart).toLocaleDateString()
                : "TBD"}
            </li>
            <li>
              <strong>End Date:</strong>{" "}
              {info.courseEnd
                ? new Date(info.courseEnd).toLocaleDateString()
                : "TBD"}
            </li>
            <li>
              <strong>Last Updated:</strong>{" "}
              {new Date(info.updatedAt).toLocaleString()}
            </li>
          </ul>
        </div>
      </div>

      {/* ================= SCORE DISTRIBUTION ================= */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Score Distribution
        </h2>
        <ul className="space-y-3 text-gray-900">
          {["excellent", "good", "satisfactory", "needsImprovement"].map(
            (key) => (
              <li key={key} className="flex items-center gap-3">
                <span className="w-32 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{
                      width: `${distPercent(key as keyof typeof dist)}%`,
                    }}
                  ></div>
                </div>
                <span className="w-10 text-right">
                  {dist[key as keyof typeof dist]}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* ================= STUDENTS TABLE ================= */}
      <div className="bg-white border rounded-xl p-6 shadow-sm overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Students</h2>
        {students.length > 0 ? (
          <table className="min-w-full table-auto border-collapse text-gray-900">
            <thead className="bg-gray-50 text-gray-900 uppercase text-sm">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Participation (5%)</th>
                <th className="px-4 py-2 text-center">Project (15%)</th>
                <th className="px-4 py-2 text-center">Midterm (30%)</th>
                <th className="px-4 py-2 text-center">Final (50%)</th>
                <th className="px-4 py-2 text-center font-bold">Final Score</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {students.map((s: any, i: number) => {
                const subjectData = safeParse(s.subjects)?.find(
                  (sub: any) => sub.Subject === info.courseName
                );

                return (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium">{s.name}</td>
                    <td className="px-4 py-2">{s.email}</td>
                    <td className="px-4 py-2 text-center">
                      {subjectData?.scores?.participation ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subjectData?.scores?.project ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subjectData?.scores?.midterm ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {subjectData?.scores?.final ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-center font-bold">
                      {subjectData?.finalScore ?? "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No students registered.</p>
        )}
      </div>
    </div>
  );
}
