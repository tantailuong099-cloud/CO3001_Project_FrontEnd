// src/services/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Hàm gửi request chung, tự động đính kèm cookie HttpOnly
 */
async function request<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: any
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // 👈 Gửi kèm cookie tới backend
  });

  if (!res.ok) {
    // Nếu backend trả lỗi, ném lỗi ra để UI xử lý
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

/**
 * API wrapper — chỉ cần gọi api.get/post/put...
 */
export const api = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body?: any) => request<T>(path, "POST", body),
  put: <T>(path: string, body?: any) => request<T>(path, "PUT", body),
  patch: <T>(path: string, body?: any) => request<T>(path, "PATCH", body),
  del: <T>(path: string) => request<T>(path, "DELETE"),
};

/**
 * Hàm tiện ích gọi API xác thực
 */
export const authApi = {
  // 🔐 Đăng nhập — backend sẽ tự set cookie
  login: (data: { email: string; password: string }) =>
    api.post<{ message: string }>("/auth/login", data),

  // 🚪 Đăng xuất — xoá cookie ở BE
  logout: () => api.post<{ message: string }>("/auth/logout"),

  // 👤 Lấy thông tin user từ cookie HttpOnly
  me: () => api.get<{ id: string; email: string; role: string }>("/auth/me"),
};
