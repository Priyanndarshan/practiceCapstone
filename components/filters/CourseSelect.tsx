// UI: CourseSelect
// Purpose: dropdown to pick a course filter; options are passed from the hook/API.
 "use client";

import React from "react";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
};

export default function CourseSelect({ options, value, onChange, className, ariaLabel = "Filter by course" }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-input ${className ?? ""}`}
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

