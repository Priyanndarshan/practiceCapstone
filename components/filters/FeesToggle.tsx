// UI: FeesToggle - select to filter by fees status.
"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
};

export default function FeesToggle({
  value,
  onChange,
  className = "",
  ariaLabel = "Filter by fees status",
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full py-2 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none transition-colors focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10 placeholder:text-gray-400 sm:w-auto sm:min-w-[140px] ${className}`}
      aria-label={ariaLabel}
    >
      <option value="all">All Fees</option>
      <option value="paid">Paid</option>
      <option value="unpaid">Unpaid</option>
    </select>
  );
}
