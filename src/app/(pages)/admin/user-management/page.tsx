import type { Metadata } from "next";
import UserManagementClient from './UserManagementClient';

export const metadata: Metadata = {
  title: "User Management",
  description: "Tutor Support System",
};

export default function UserManagementPage() {
  return <UserManagementClient />;
}