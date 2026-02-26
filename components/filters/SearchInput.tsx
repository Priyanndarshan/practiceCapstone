// UI: SearchInput - controlled search input with optional submit button.
"use client"; // This component runs on the client so it can use state and event handlers.

import React from "react"; // React is used for JSX and type definitions.

// Props type: defines what the parent must pass (and what is optional).
type Props = {
  value: string; // Current value of the search input (controlled component).
  onChange: (v: string) => void; // Called whenever the user types; parent updates state.
  onSubmit?: () => void; // Optional: if provided, a "Search" button is shown and this runs on click or Enter.
  placeholder?: string; // Optional placeholder text inside the input (default: "Search...").
  className?: string; // Optional extra CSS classes to merge with the input.
};

// Shared Tailwind classes for the input so we don't repeat a long string.
const inputBase =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";

// Default export: the SearchInput component.
export default function SearchInput({
  value, // Destructure props from the parent.
  onChange,
  onSubmit,
  placeholder = "Search...", // Default placeholder if not provided.
  className = "", // Default to empty string so we can always append to class list.
}: Props) {
  return (
    // Wrapper: allows input to grow (flex-1) but not shrink below min width.
    <div className="min-w-40 flex-1">
      <input
        aria-label="Search" // Accessibility: screen readers know this is a search field.
        placeholder={placeholder} // Text shown when input is empty.
        value={value} // Controlled: value comes from parent state.
        onChange={(e) => onChange(e.target.value)} // On each keystroke, tell parent the new value.
        className={`${inputBase} ${className}`} // Base styles plus any extra classes from parent.
        onKeyDown={(e) => {
          // When user presses a key while focused on the input:
          if (e.key === "Enter" && onSubmit) onSubmit(); // If Enter and onSubmit exists, run it.
        }}
      />
      {/* Only render the Search button when onSubmit was passed by the parent. */}
      {onSubmit && (
        <button
          type="button" // Prevents form submit behavior when inside a form.
          className="ml-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95"
          onClick={onSubmit} // When clicked, call the parent's submit handler.
        >
          Search
        </button>
      )}
    </div>
  );
}
