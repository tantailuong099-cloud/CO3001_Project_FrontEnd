import type { Metadata } from "next";
import ProgramManagementClient from './ProgramManagementClient'

export const metadata: Metadata = {
  title: "Program Detail Admin",
  description: "Tutor Support System",
};

export default function ProgramManagementPage() {
  return <ProgramManagementClient />;
}
