// HOME PAGE — Server Component (no "use client").
// Route: /
// This is a static landing page with navigation links.
// Because it has no interactivity (no state, no effects), it renders
// entirely on the server and ships zero JavaScript to the browser.
import Link from "next/link";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Welcome to StudentMgmt</h1>
        <p className="text-gray-600 mb-6">
          A small demo app to manage students. Use the Students page to add, view, edit and delete entries.
        </p>
        <div className="flex gap-3">
          <Link href="/students" className="btn no-underline">View Students</Link>
          <Link href="/students/add" className="btn-secondary no-underline">Add Student</Link>
        </div>
      </div>
    </Container>
  );
}
