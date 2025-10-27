"use client";

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
  title?: string;
  "aria-label": string;
}

export default function DeleteButton({
  onClick,
  title = "Delete item",
  "aria-label": ariaLabel,
}: DeleteButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-2 bg-red-50 rounded-md hover:bg-red-100 transition"
      aria-label={ariaLabel}
    >
      <Trash2 className="text-red-600" size={16} />
    </button>
  );
}
