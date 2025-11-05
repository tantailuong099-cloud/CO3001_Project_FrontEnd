"use client";
import { useState } from "react";
import SummaryModal from "../card/SummaryModel";

export default function ReportButtons() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <button className="bg-[#0C54E4] hover:bg-[#041C4C] px-4 py-2 rounded-md text-sm font-medium">
        Generate Report
      </button>

      <button
        className="bg-[#0C54E4] hover:bg-[#041C4C] px-4 py-2 rounded-md text-sm font-medium"
        onClick={() => setShowSummary(true)}
      >
        Summary Report
      </button>

      {/* Popup Summary */}
      {showSummary && <SummaryModal onClose={() => setShowSummary(false)} />}
    </>
  );
}
 