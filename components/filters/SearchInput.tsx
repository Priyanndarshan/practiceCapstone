 "use client";

import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({ value, onChange, onSubmit, placeholder = "Search...", className }: Props) {
  return (
    <div style={{ flex: 1 }}>
      <input
        aria-label="Search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`form-input ${className ?? ""} search-input`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit();
        }}
      />
      {onSubmit && (
        <button className="btn btn-primary" onClick={onSubmit} style={{ marginLeft: 8 }}>
          Search
        </button>
      )}
    </div>
  );
}

