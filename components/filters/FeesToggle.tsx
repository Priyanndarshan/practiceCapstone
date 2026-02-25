 "use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
};

export default function FeesToggle({ value, onChange, className, ariaLabel = "Filter by fees status" }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-input ${className ?? ""}`}
      aria-label={ariaLabel}
    >
      <option value="all">All Fees</option>
      <option value="paid">Paid</option>
      <option value="unpaid">Unpaid</option>
    </select>
  );
}

