import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Profile",
  description: "Tutor Support System - User Profile",
};

export default function ProfilePage() {
  return <ProfileClient />;
}