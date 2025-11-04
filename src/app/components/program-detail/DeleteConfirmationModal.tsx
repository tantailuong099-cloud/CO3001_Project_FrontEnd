"use client";

import { X, AlertTriangle, Trash2 } from "lucide-react";
import React from "react";

interface DeleteConfirmationModalProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex">
              <div className="mr-4 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:h-10 sm:w-10">
                <AlertTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold text-gray-900"
                  id="modal-title"
                >
                  Delete Course
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete the course "
                    <strong>{itemName}</strong>"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col sm:flex-row-reverse sm:gap-3 gap-2">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              // --- FIX: Changed w-full to w-auto on sm screens ---
              className="flex-1 sm:flex-none justify-center items-center gap-2 inline-flex w-full sm:w-auto rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <Trash2 size={18} />
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              // --- FIX: Changed w-full to w-auto on sm screens ---
              className="flex-1 sm:flex-none justify-center items-center gap-2 mt-0 inline-flex w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

