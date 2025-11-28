// src/services/reportApi.ts
import { api } from "./api"; // Import hàm api gốc

// (Các Interface... giữ nguyên)
export interface RawResource {
  _id: string; 
  payload: Record<string, any>; // Sửa: Dữ liệu thô luôn có payload
}
export interface ChartDataPoint {
  name: string;
  value: number;
}
export interface PieChartDataPoint {
  name: string;
  value: number;
}
export interface HeatmapDataPoint {
  day: number;
  hour_slot: number;
  value: number;
}
export interface StackedChartDataPoint {
  name: string;
  Classrooms: number;
  Labs: number;
  Other: number;
}
interface ApiResponse<T> {
  ok: boolean;
  total: number;
  data: T;
}

/**
 * API wrapper cho tất cả các endpoint liên quan đến Report
 */
export const reportApi = {
  
  // === 1. RESOURCE ALLOCATION ===
  getRawResourceAllocation: (params?: string) =>
    api.get<ApiResponse<RawResource[]>>(`/api/report/resource-allocation/raw?${params || ""}`),

  getResourceSummaryModal: (params?: string) =>
    api.get<ApiResponse<any[]>>(`/api/report/resource-allocation/summary?${params || ""}`),

  getFacilityUsageByMonth: (params?: string) =>
    api.get<ApiResponse<ChartDataPoint[]>>(`/api/report/resource-allocation/by-month?${params || ""}`),
    
  getFacilityTypeDistribution: (params?: string) =>
    api.get<ApiResponse<PieChartDataPoint[]>>(`/api/report/resource-allocation/by-type?${params || ""}`),

  getOccupancyRate: (params?: string) =>
    api.get<ApiResponse<ChartDataPoint[]>>(`/api/report/resource-allocation/occupancy-rate?${params || ""}`),
  
  getWeeklyHeatmap: (params?: string) =>
    api.get<ApiResponse<HeatmapDataPoint[]>>(`/api/report/resource-allocation/weekly-heatmap?${params || ""}`),

  getUsageByBuilding: (params?: string) =>
    api.get<ApiResponse<ChartDataPoint[]>>(`/api/report/resource-allocation/by-building?${params || ""}`),

  getStackedFacilityUsage: (params?: string) =>
    api.get<ApiResponse<StackedChartDataPoint[]>>(`/api/report/resource-allocation/stacked-usage?${params || ""}`),

  //  HÀM MỚI 1 (Student Chart 2) 
  getStudentEngagement: (params?: string) =>
    api.get<ApiResponse<PieChartDataPoint[]>>(`/api/report/resource-allocation/student-engagement?${params || ""}`),

  //  HÀM MỚI 2 (Student Chart 3) 
  getSupportHoursByFaculty: (params?: string) =>
    api.get<ApiResponse<ChartDataPoint[]>>(`/api/report/resource-allocation/support-by-faculty?${params || ""}`),
  
  // === 2. STUDENT PERFORMANCE ===
  getRawStudentPerformance: (params?: string) =>
    api.get<ApiResponse<any[]>>(`/api/report/student-performance/summary?${params || ""}`),
  getGeneratedStudentPerformance: (params?: string) =>
    api.get<ApiResponse<any[]>>(`/api/report/student-performance/generate?${params || ""}`),

  // === 3. STUDENT EVALUATION ===
  getRawStudentEvaluation: (params?: string) =>
    api.get<ApiResponse<any[]>>(`/api/report/student-evaluation/summary?${params || ""}`),
  getGeneratedStudentEvaluation: (params?: string) =>
    api.get<ApiResponse<any[]>>(`/api/report/student-evaluation/generate?${params || ""}`),
};