import type { Metadata } from "next";
import CreateProgramClient from './CreateProgramClient';

export const metadata: Metadata = {
  title: "Create Program",
  description: "Create new program - Tutor Support System",
};

export default function CreateProgramPage() {
  return <CreateProgramClient />;
}