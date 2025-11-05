"use client";

import { Edit } from "lucide-react";
import React from "react";

interface EditButtonProps {
  onClick: () => void;
  title?: string;
  "aria-label": string;
}

export default function EditButton({
  onClick,
  title = "Edit item",
  "aria-label": ariaLabel,
}: EditButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-2 bg-yellow-50 rounded-md hover:bg-yellow-100 transition"
      aria-label={ariaLabel}
    >
      <Edit className="text-yellow-600" size={16} />
    </button>
  );
}
