import type { Metadata } from "next";
import Search from "@/app/components/search/Search";
import { ChevronLeft, ChevronRight } from "lucide-react"; //new library


export const metadata: Metadata = {
  title: "Materials Details",
  description: "Tutor Support System",
};

import Image from "next/image";

// src/app/(pages)/materials/[id]/page.tsx
// src/app/(pages)/materials/[id]/page.tsx

export default function MaterialsDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-16 py-10">
      {/* Header */}

      <div className="py-7 px-[30px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">Material Library</h1>

          <Search placeholder="Search Book Name" />
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex justify-center gap-6 mb-6">
        {/* Left: Book cover */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
          <img
            src="/image/demo_materials.png"
            alt="General Physics A1"
            className="rounded-md w-full h-auto"
          />
        </div>

        {/* Middle: Description */}
        <div className="w-1/2 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3">
            Description
          </h2>
          <p className="text-sm leading-relaxed mb-2">
            <strong>Physics 1</strong> is your backstage pass to the universe:
            motion, forces, energy, and oscillations — explained not with magic,
            but with math. This course doesn’t just teach formulas; it teaches
            how the world actually works.
          </p>
          <ul className="list-disc ml-6 text-sm leading-relaxed">
            <li>Newton’s laws that make the world go round (literally).</li>
            <li>
              Work, energy, and why your coffee mug falls exactly the same way
              every time.
            </li>
            <li>
              Rotational motion and torque (a.k.a. “Physics with a twist”).
            </li>
            <li>
              Harmonic oscillations and waves that make the universe hum.
            </li>
          </ul>
        </div>

        {/* Right: Download section */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
          <button className="w-full bg-gray-700 text-white py-2 rounded-md mb-4 hover:bg-gray-800 transition">
            Download document
          </button>
          <img
            src="/image/demo_materials.png"
            alt="Download preview"
            className="rounded-md w-full h-auto mb-4"
          />

          {/* Preview thumbnails + pagination */}
          <div className="flex justify-center items-center w-full gap-2">
      <div className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">
        <ChevronLeft size={18} strokeWidth={2} />
      </div>

      <div className="flex gap-1 overflow-hidden">
        {[1, 2, 3, 4].map((n) => (
          <img
            key={n}
            src="/image/demo_materials.png"
            className="w-10 h-14 border border-gray-300 rounded-sm cursor-pointer hover:opacity-80"
          />
        ))}
      </div>

      <div className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">
        <ChevronRight size={18} strokeWidth={2} />
      </div>
    </div>
        </div>
      </div>

      {/* Information (aligned perfectly with 3 columns above) */}
      <div className="flex justify-center gap-6">
        <div className="w-[calc(75%+25%+1.5rem)] bg-white p-6 shadow-md rounded-lg text-sm">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-3">
            Information
          </h2>
          <div className="space-y-1">
            <p>
              <strong>Document Title:</strong> General Physics A1 Exercises
            </p>
            <p>
              <strong>Author:</strong> Trần Văn Lương (Chief Editor)
            </p>
            <p>
              <strong>Subject:</strong> General Physics
            </p>
            <p>
              <strong>Date Posted:</strong> October 15, 2025
            </p>
            <p>
              <strong>Downloads:</strong> 245
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
