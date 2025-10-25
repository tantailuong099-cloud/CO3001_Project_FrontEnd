"use client";
import { useState } from "react";
import SummaryModal from "@/app/components/card/SummaryModel";

export default function ReportButtons() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm font-medium">
        Generate Report
      </button>

      <button
        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md text-sm font-medium"
        onClick={() => setShowSummary(true)}
      >
        Summary Report
      </button>

      {/* Popup Summary */}
      {showSummary && <SummaryModal onClose={() => setShowSummary(false)} />}
    </>
  );
}
 