"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// --- Interface cho Props và Dữ liệu Chart ---
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}

interface OverviewLineChartProps {
  chartData: ChartData | null;
}

export default function OverviewLineChart({
  chartData,
}: OverviewLineChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;

    // Thoát nếu chưa có canvas hoặc chưa có dữ liệu
    if (!canvas || !chartData) return;

    // Hủy biểu đồ cũ trước khi vẽ cái mới để tránh memory leak
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Vẽ biểu đồ mới với dữ liệu từ props
    chartInstanceRef.current = new Chart(canvas, {
      type: "line",
      data: chartData, // 👈 SỬ DỤNG DỮ LIỆU TỪ PROPS
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: {
            display: true,
            text: "New Users and Courses Created Over Last 6 Months",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Month" },
          },
          y: {
            title: { display: true, text: "Quantity" },
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
      },
    });

    // Hàm dọn dẹp khi component bị unmount
    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [chartData]); // 👈 Re-render biểu đồ khi chartData thay đổi

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="font-bold text-[24px] text-gray-900">
          System Growth Overview
        </h2>
        {/* Phần input này bạn có thể giữ lại để phát triển chức năng lọc sau */}
        <input
          type="month"
          className="h-7 border border-gray-300 rounded px-4 text-xs font-semibold w-[170px]"
        />
      </div>
      <div className="h-[350px]">
        {/* Nếu không có dữ liệu, hiển thị thông báo */}
        {!chartData ? (
          <p className="text-center text-gray-500">Loading chart data...</p>
        ) : (
          <canvas id="overview-line-chart" ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
}
