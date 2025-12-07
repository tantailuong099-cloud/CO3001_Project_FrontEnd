"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function OverviewLineChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Tháng
        datasets: [
          {
            label: "Tutor",
            data: [32, 35, 36, 40, 43, 45],
            borderColor: "#6366F1",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Student",
            data: [3200, 3400, 3600, 3636, 3800, 4000],
            borderColor: "#F59E0B",
            borderWidth: 2,
            tension: 0.3,
          },
          {
            label: "Course",
            data: [1000, 1100, 1150, 1200, 1280, 1300],
            borderColor: "#10B981",
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: "bottom" },
        },
        scales: {
          x: {
            title: { display: true, text: "Tháng" },
          },
          y: {
            title: { display: true, text: "Số lượng" },
          },
        },
        maintainAspectRatio: false,
      },
    });
    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h2 className="font-bold text-[24px] text-gray-900">
          Thống kê số lượng Tutor / Student / Course
        </h2>
        <input
          type="month"
          className="h-7 border border-gray-300 rounded px-4 text-xs font-semibold w-[170px]"
        />
      </div>
      <div className="h-[350px]">
        <canvas id="overview-line-chart" ref={chartRef}></canvas>
      </div>
    </div>
  );
}
