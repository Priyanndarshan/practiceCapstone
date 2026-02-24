// CONTAINER — Server Component. A simple wrapper that centers content
// with a max-width. Used by every page to keep layout consistent.
// This avoids repeating the same wrapper div across all pages (DRY principle).
export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="app-container">{children}</div>;
}
