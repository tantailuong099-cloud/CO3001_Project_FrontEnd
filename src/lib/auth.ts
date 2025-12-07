import { cookies } from 'next/headers';

interface UserPayload {
  userId: string;
  email: string;
  role: 'Student' | 'Tutor' | 'Admin';
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies(); 
  const tokenCookie = cookieStore.get('user_info');

  if (!tokenCookie) {
    return null; // Không đăng nhập
  }

  try {
    const userPayload: UserPayload = JSON.parse(tokenCookie.value);
    return userPayload;
  } catch (error) {
    console.error("Failed to parse user_info cookie:", error);
    return null; // Cookie bị lỗi
  }
}