import type { Metadata } from "next";
import { UserCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile",
  description: "Tutor Support System",
};

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const InfoLink = ({ href, text }: { href: string; text: string }) => (
  <a href={href} className="text-blue-600 hover:underline block mb-1">{text}</a>
);

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
              <UserCircle2 className="w-16 h-16 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Trình Ai Chấm</h1>
              <p className="text-gray-500">Student</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Reset to default
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*Left*/}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <InfoSection title="User detail">
              <div className="space-y-3 text-sm">
                <p><strong>Email:</strong> anhmuonlam3metuhao@gmail.com</p>
                <p><strong>Nationality:</strong> Việt Nam</p>
                <p><strong>City/Province:</strong> Ho Chi Minh city</p>
                <p><strong>Time zone:</strong> Asia/Ho_Chi_Minh</p>
              </div>
            </InfoSection>

            <InfoSection title="Privacy and Policies">
              <InfoLink href="#" text="Data retention summary" />
            </InfoSection>

            <InfoSection title="Course Details">
              <InfoLink href="#" text="Course overview" />
            </InfoSection>

            <InfoSection title="Activities">
              <p className="text-sm text-gray-600">The list of activities related to this user will be displayed here</p>
              <p className="text-sm text-gray-600">The list of activities related to this user will be displayed here</p>
              <p className="text-sm text-gray-600">The list of activities related to this user will be displayed here</p>
              <p className="text-sm text-gray-600">The list of activities related to this user will be displayed here</p>
              <p className="text-sm text-gray-600">The list of activities related to this user will be displayed here</p>
            </InfoSection>
          </div>

          {/*Right*/}
          <div className="flex flex-col gap-8">
            <InfoSection title="Other Content">
              <InfoLink href="#" text="Blog entries" />
              <InfoLink href="#" text="Forum posts" />
              <InfoLink href="#" text="Forum discussions" />
              <InfoLink href="#" text="Learning plans" />
            </InfoSection>
            
            <InfoSection title="Reports">
              <InfoLink href="#" text="Browser sessions" />
              <InfoLink href="#" text="Grades overview" />
            </InfoSection>
            
            <InfoSection title="Login Activities">
              <div className="text-sm space-y-3">
                <p>
                  <strong>First access to the website: </strong> 
                  Thursday, January 4, 2024, 5:29 PM (1 year 291 days a)
                </p>
                <p>
                  <strong>Last access to the website: </strong> 
                  Tuesday, October 21, 2025, 6:20 PM (5 seconds ago)
                </p>
              </div>
            </InfoSection>

            <InfoSection title="Support">
               <InfoLink href="#" text="Contact and support information" />
            </InfoSection>
          </div>
        </main>
      </div>
    </div>
  );
}