// UI: SearchInput - controlled search input with optional submit.
"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  className = "",
}: Props) {
  return (
    <div className="flex-1 min-w-[160px]">
      <input
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-2 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none transition-colors focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10 placeholder:text-gray-400 ${className}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
      />
      {onSubmit && (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-indigo-600 border-none rounded-lg cursor-pointer transition-colors hover:bg-indigo-700 active:scale-[0.98] ml-2"
          onClick={onSubmit}
        >
          Search
        </button>
      )}
    </div>
  );
}
