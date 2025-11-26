import { api } from './api';

// ========================
// 1. DATA INTERFACES
// ========================

/**
 * Common fields for all users (matches user.schema.ts)
 */
export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  role: 'Tutor' | 'Student' | 'Admin';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Sub-document interfaces
 */
export interface TutorConstraint {
  day: string;
  startTime: string;
  endTime: string;
}

export interface StudentSubject {
  Subject: string;
  score: number;
}

// ========================
// 2. ROLE SPECIFIC INTERFACES
// ========================

export interface Student extends BaseUser {
  role: 'Student';
  subjects?: StudentSubject[];
  class?: string[];
}

export interface Tutor extends BaseUser {
  role: 'Tutor';
  preferredSubjects?: string[];
  preferredStudentLevel?: string;
  maxStudents?: number;
  courses?: string[];
  sharedMaterial?: string[];
  constraints?: TutorConstraint[];
}

export interface Admin extends BaseUser {
  role: 'Admin';
  permissions?: string[];
}

// Union type for general usage
export type User = Student | Tutor | Admin;

// ========================
// 3. DTOs (Data Transfer Objects)
// ========================

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'Tutor' | 'Student' | 'Admin';
  avatar?: string;
}

export type UpdateUserPayload = Partial<User>;

// ========================
// 4. API METHODS
// ========================

export const userApi = {
  
  /**
   * Create a new user
   * Endpoint: POST /user/create
   */
  createUser: (data: CreateUserPayload) =>
    api.post<User>('/user/create', data),

  /**
   * Get all users and filter by role on the client side
   * Endpoint: GET /user
   */
  getUsersListByRole: async (role: 'Tutor' | 'Student' | 'Admin'): Promise<User[]> => {
    try {
      // Get all users from backend
      const allUsers = await api.get<User[]>('/user');
      
      // Filter by role on client side
      return allUsers.filter(user => user.role === role);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get a specific user by ID
   * Endpoint: GET /user/:id
   */
  getUserById: (userId: string) =>
    api.get<User>(`/user/${userId}`),

  /**
   * Helpers for specific roles
   */
  getAllStudents: async (): Promise<Student[]> => {
    const users = await userApi.getUsersListByRole('Student');
    return users as Student[];
  },

  getAllTutors: async (): Promise<Tutor[]> => {
    const users = await userApi.getUsersListByRole('Tutor');
    return users as Tutor[];
  },

  getAllAdmins: async (): Promise<Admin[]> => {
    const users = await userApi.getUsersListByRole('Admin');
    return users as Admin[];
  },

  /**
   * Get all users
   * Endpoint: GET /user
   */
  getAllUsers: () =>
    api.get<User[]>('/user'),

  /**
   * Update user information
   * Endpoint: POST /user/update/:id
   */
  updateUser: (userId: string, data: UpdateUserPayload) =>
    api.post<User>(`/user/update/${userId}`, data),
};

export default userApi;