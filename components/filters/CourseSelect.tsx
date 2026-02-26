// UI: CourseSelect - dropdown to filter by course.
"use client";

import React from "react";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
};

const selectBase =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 sm:w-auto sm:min-w-36";

export default function CourseSelect({
  options,
  value,
  onChange,
  className = "",
  ariaLabel = "Filter by course",
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${selectBase} ${className}`}
      aria-label={ariaLabel}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o === "all" ? "All Courses" : o}
        </option>
      ))}
    </select>
  );
}
