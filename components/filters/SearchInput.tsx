"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
};

const inputBase =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: Props) {
  return (
    <div className="min-w-40 flex-1">
      <input
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} ${className}`}
      />
    </div>
  );
}
