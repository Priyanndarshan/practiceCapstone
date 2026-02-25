"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  label?: string;
  className?: string;
};

export default function YearMultiSelect({ options, selected, onChange, label = "Years", className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function toggleValue(v: string) {
    if (selected.includes(v)) onChange(selected.filter((s) => s !== v));
    else onChange([...selected, v]);
  }

  function clearAll() {
    onChange([]);
  }

  const id = `year-multiselect-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`${className ?? ""} ym-container`} ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={id}
        className="dropdown-trigger ym-trigger"
        onClick={() => setIsOpen((s) => !s)}
      >
        <div className="ym-trigger-content">
          {selected.length === 0 ? (
            <span className="ym-trigger-label">{`All ${label}`}</span>
          ) : (
            <div className="ym-chips">
              {selected.slice(0, 3).map((s) => (
                <span key={s} className="ym-chip">
                  {s}
                </span>
              ))}
              {selected.length > 3 ? <span className="ym-more">+{selected.length - 3}</span> : null}
            </div>
          )}
        </div>
        <span className="dropdown-trigger-caret ym-caret">▾</span>
      </button>

      {isOpen && (
        <div id={id} className="year-dropdown ym-dropdown-panel" role="menu" aria-label={label}>
          <div className="ym-panel-header">
            <label className="ym-all">
              <input
                type="checkbox"
                checked={(() => {
                  const valueOptions = options.filter((o) => o !== "all");
                  return valueOptions.length > 0 && selected.length === valueOptions.length;
                })()}
                onChange={() => {
                  const valueOptions = options.filter((o) => o !== "all");
                  const allSelected = valueOptions.length > 0 && selected.length === valueOptions.length;
                  if (allSelected) onChange([]);
                  else onChange(valueOptions);
                }}
                aria-checked={(() => {
                  const valueOptions = options.filter((o) => o !== "all");
                  return valueOptions.length > 0 && selected.length === valueOptions.length;
                })()}
              />
              <span className="ym-all-label">All {label}</span>
            </label>
            <div>{selected.length > 0 ? <button type="button" className="ym-clear-btn" onClick={() => onChange([])}>Clear</button> : null}</div>
          </div>

          <div className="ym-items">
            {options.filter((o) => o !== "all").map((o) => (
              <label
                key={o}
                className={`year-dropdown-item ym-item ${selected.includes(o) ? "ym-item--selected" : ""}`}
                role="menuitemcheckbox"
                aria-checked={selected.includes(o)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(o)}
                  onChange={() => toggleValue(o)}
                  aria-checked={selected.includes(o)}
                />
                <span className="year-dropdown-text">{o}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

