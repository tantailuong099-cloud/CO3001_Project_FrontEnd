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
  password?: string;
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

export interface StudentScores {
  midterm: number;
  final: number;
  project: number;
  participation: number;
}

export interface StudentSubject {
  Subject: string;
  scores: StudentScores;
  finalScore: number;
}

// ========================
// 2. ROLE SPECIFIC INTERFACES
// ========================

export interface Student extends BaseUser {
  role: 'Student';
  studentId?: string;
  major?: string;
  enrolledCourses?: string | string[];
  registrations?: string[];
  subjects?: StudentSubject[];
}

export interface Tutor extends BaseUser {
  role: 'Tutor';
  tutorId?: string;
  department?: string;
  assignedCourses?: string | string[];
  assignedGroups?: string[];
  sharedMaterial?: string | string[];
  constraints?: string | TutorConstraint[];
  maxStudents?: number;
  subjects?: string[];
}

export interface Admin extends BaseUser {
  role: 'Admin';
  permissions?: string[];
}

// Union type for general usage
export type User = Student | Tutor | Admin;

// ========================
// 3. HELPER FUNCTIONS
// ========================

/**
 * Parse string array from database (handles "['item1', 'item2']" format)
 */
export function parseStringArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    // Replace single quotes with double quotes for valid JSON
    const jsonString = value.replace(/'/g, '"');
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Parse constraints from database (handles string format)
 */
export function parseConstraints(value: string | TutorConstraint[] | undefined): TutorConstraint[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const jsonString = value.replace(/'/g, '"');
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ========================
// 4. DTOs (Data Transfer Objects)
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
   * Endpoint: POST /api/user/create
   */
  createUser: (data: CreateUserPayload) =>
    api.post<User>('/api/user/create', data),

  /**
   * Get users by role
   * Endpoint: GET /api/user/role/:role (Student, Tutor, Admin)
   */
  getUsersListByRole: async (role: 'Tutor' | 'Student' | 'Admin'): Promise<User[]> => {
    try {
      const users = await api.get<User[]>(`/api/user/${role}`);
      return Array.isArray(users) ? users : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get a specific user by ID
   * Endpoint: GET /api/user/:id
   */
  getUserById: async (userId: string): Promise<User | null> => {
    try {
      const user = await api.get<User>(`/api/user/${userId}`);
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  },

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
   * Get all users (fetches all roles and combines)
   */
  getAllUsers: async (): Promise<User[]> => {
    const [students, tutors, admins] = await Promise.all([
      api.get<User[]>('/api/user/Student'),
      api.get<User[]>('/api/user/Tutor'),
      api.get<User[]>('/api/user/Admin'),
    ]);
    return [...students, ...tutors, ...admins];
  },

  /**
   * Update user information
   * Endpoint: POST /api/user/update/:id
   */
  updateUser: (userId: string, data: UpdateUserPayload) =>
    api.post<User>(`/api/user/update/${userId}`, data),
};

export default userApi;