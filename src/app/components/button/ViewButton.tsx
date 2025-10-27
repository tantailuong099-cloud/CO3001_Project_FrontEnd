"use client";

import { Eye } from "lucide-react";
import React from "react";

interface ViewButtonProps {
  onClick: () => void;
  title?: string;
  "aria-label": string;
}

export default function ViewButton({
  onClick,
  title = "View details",
  "aria-label": ariaLabel,
}: ViewButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition"
      aria-label={ariaLabel}
    >
      <Eye className="text-blue-600" size={16} />
    </button>
  );
}
