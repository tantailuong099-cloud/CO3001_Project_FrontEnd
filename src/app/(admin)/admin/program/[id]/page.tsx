import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramSummary from "@/app/components/pages/program-detail/ProgramSummary";
import ProgramDescription from "@/app/components/pages/program-detail/ProgramDescription";
import ProgramSessionsTable from "@/app/components/pages/program-detail/ProgramSessionsTable";

export const metadata: Metadata = {
  title: "Program Detail Admin",
  description: "Tutor Support System",
};

const programs = [
  {
    code: "CO2301",
    name: "Computer Network",
    credit: 4,
    lecturer: "Phạm Hồng Phát",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "2025-02-10",
    duration: "12 weeks",
    sessionCode: "CC01",
    sessionType: "Offline",
    location: "Room E204 - HCMUT",
    status: "Ongoing",
    totalStudents: 68,
    attendanceRate: 92,
    description:
      "This course provides foundational knowledge of computer networks, protocols, and communication models. Students will gain hands-on experience configuring and analyzing network systems.",
    sessions: [
      {
        id: 1,
        date: "2025-03-01",
        topic: "Introduction to Networks",
        status: "Completed",
      },
      {
        id: 2,
        date: "2025-03-08",
        topic: "Network Layers & Protocols",
        status: "Completed",
      },
      {
        id: 3,
        date: "2025-03-15",
        topic: "IP Addressing & Subnetting",
        status: "Upcoming",
      },
      {
        id: 4,
        date: "2025-03-22",
        topic: "Routing & Switching",
        status: "Upcoming",
      },
    ],
  },
];

export default function ProgramDetailAdminPage({
  params,
}: {
  params: { id: string };
}) {
  const program = programs.find(
    (p) => p.code.toLowerCase() === params.id.toLowerCase()
  );

  if (!program) return notFound();

  const heldSessions = program.sessions.filter((s) => s.status === "Completed");
  const upcomingSessions = program.sessions.filter(
    (s) => s.status === "Upcoming"
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">{program.name}</h1>
      <p className="text-gray-500 mb-6">
        <span className="font-medium">Course Code:</span> {program.code} •{" "}
        <span className="font-medium">Department:</span> {program.department}
      </p>

      <ProgramSummary {...program} />
      <ProgramDescription description={program.description} />
      <ProgramSessionsTable title="Held Sessions" sessions={heldSessions} />
      <ProgramSessionsTable
        title="Upcoming Sessions"
        sessions={upcomingSessions}
      />
    </div>
  );
}
