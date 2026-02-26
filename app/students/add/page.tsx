// Page: /students/add - form to create a new student via POST /api/students.
"use client"; // Client component so we can use useState, useRouter, and form handlers.

import { useState, type FormEvent } from "react"; // For form state (inputs, error, submitting).
import { useRouter } from "next/navigation"; // For redirecting to /students after success.
import Container from "@/components/layout/container"; // Page wrapper with max-width and padding.

// Reusable Tailwind class strings so we don't repeat long classNames in every input/label/group.
const inputBase =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";
const labelBase = "text-sm font-semibold text-gray-500";
const groupBase = "flex flex-col gap-1.5";

export default function AddStudentPage() {
  const router = useRouter(); // Hook to navigate programmatically (e.g. after submit).

  // Form field state: each input is controlled by React state.
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  // UI state: error message to show, and whether we're currently submitting (disables button).
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Runs when the user submits the form (clicks "Add Student" or presses Enter).
  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Stop the browser from doing a full-page form POST.
    setError(null); // Clear any previous error before validating again.

    // Validation: require all text fields to be non-empty (after trimming spaces).
    if (
      !name.trim() ||
      !age.trim() ||
      !course.trim() ||
      !email.trim() ||
      !semester.trim() ||
      !enrollmentYear.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    // Validation: age must be a number greater than 0.
    if (isNaN(Number(age)) || Number(age) <= 0) {
      setError("Age must be a valid positive number.");
      return;
    }

    // Validation: semester must be between 1 and 10.
    if (isNaN(Number(semester)) || Number(semester) < 1 || Number(semester) > 10) {
      setError("Semester must be between 1 and 10.");
      return;
    }

    setSubmitting(true); // Show "Adding..." and disable submit button.
    try {
      // Send POST request to API with form data as JSON body.
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          age: Number(age),
          course: course.trim(),
          email: email.trim(),
          semester: Number(semester),
          enrollmentYear: Number(enrollmentYear),
          feesPaid,
        }),
      });

      // If API returned 4xx or 5xx, parse error message and throw so catch block runs.
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Failed to create student");
      }

      // Success: redirect to the students list page.
      router.push("/students");
    } catch (err: unknown) {
      // Show error message in UI (from API message or generic fallback).
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSubmitting(false); // Re-enable button whether we succeeded or failed.
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-xl">
        {/* Page title row. */}
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Add Student</h1>
        </div>

        {/* Form: onSubmit runs handleSubmit when user submits. */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {/* Full Name field: label + controlled input. */}
          <div className={groupBase}>
            <label className={labelBase} htmlFor="name">
              Full Name
            </label>
            <input
              className={inputBase}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          {/* Age field: numeric input with placeholder. */}
          <div className={groupBase}>
            <label className={labelBase} htmlFor="age">
              Age
            </label>
            <input
              className={inputBase}
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              inputMode="numeric"
              placeholder="e.g. 20"
            />
          </div>

          {/* Course field. */}
          <div className={groupBase}>
            <label className={labelBase} htmlFor="course">
              Course
            </label>
            <input
              className={inputBase}
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              placeholder="e.g. B.Tech CSE"
            />
          </div>

          {/* Email field: type="email" for browser validation and keyboard. */}
          <div className={groupBase}>
            <label className={labelBase} htmlFor="email">
              Email
            </label>
            <input
              className={inputBase}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. aarav@vit.ac.in"
            />
          </div>

          {/* Two-column row on larger screens: Semester and Enrollment Year. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className={groupBase}>
              <label className={labelBase} htmlFor="semester">
                Semester
              </label>
              <input
                className={inputBase}
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                inputMode="numeric"
                min={1}
                max={10}
                placeholder="e.g. 4"
              />
            </div>
            <div className={groupBase}>
              <label className={labelBase} htmlFor="enrollmentYear">
                Enrollment Year
              </label>
              <input
                className={inputBase}
                id="enrollmentYear"
                value={enrollmentYear}
                onChange={(e) => setEnrollmentYear(e.target.value)}
                required
                inputMode="numeric"
                min={2018}
                max={2030}
                placeholder="e.g. 2024"
              />
            </div>
          </div>

          {/* Fees Paid: checkbox bound to feesPaid state. */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="feesPaid"
              checked={feesPaid}
              onChange={(e) => setFeesPaid(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-indigo-600"
            />
            <label
              htmlFor="feesPaid"
              className="cursor-pointer text-sm font-medium text-gray-500"
            >
              Fees Paid
            </label>
          </div>

          {/* Show validation/API error message if any. */}
          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit and Cancel buttons. */}
          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
            >
              {submitting ? "Adding..." : "Add Student"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/students")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
