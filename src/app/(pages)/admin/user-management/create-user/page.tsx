import type { Metadata } from "next";
import CreateUserClient from './CreateUserClient';

export const metadata: Metadata = {
  title: "Create User",
  description: "Create new user - Tutor Support System",
};

export default function CreateUserPage() {
  return <CreateUserClient />;
}