"use client";

interface Session {
  id: number;
  date: string;
  topic: string;
  status: "Completed" | "Upcoming";
}

interface ProgramSessionsTableProps {
  title: string;
  sessions: Session[];
}

export default function ProgramSessionsTable({ title, sessions }: ProgramSessionsTableProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-3">#</th>
            <th className="py-2 px-3">Date</th>
            <th className="py-2 px-3">Topic</th>
            <th className="py-2 px-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={session.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">{session.date}</td>
              <td className="py-2 px-3">{session.topic}</td>
              <td className="py-2 px-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    session.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {session.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
