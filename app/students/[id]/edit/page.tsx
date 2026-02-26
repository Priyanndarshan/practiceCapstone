// Page: /students/[id]/edit - form to update a student via PATCH /api/students/[id].
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/container";

export default function EditStudentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setName(data.name ?? "");
        setAge(String(data.age ?? ""));
        setCourse(data.course ?? "");
        setEmail(data.email ?? "");
        setSemester(String(data.semester ?? ""));
        setEnrollmentYear(String(data.enrollmentYear ?? ""));
        setFeesPaid(Boolean(data.feesPaid));
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError(null);

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

    if (isNaN(Number(age)) || Number(age) <= 0) {
      setError("Age must be a valid positive number.");
      return;
    }

    if (isNaN(Number(semester)) || Number(semester) < 1 || Number(semester) > 10) {
      setError("Semester must be between 1 and 10.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "PATCH",
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

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Failed to update student");
      }

      router.push(`/students/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full py-2 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none transition-colors focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10 placeholder:text-gray-400";
  const labelClasses = "text-sm font-semibold text-gray-500";
  const groupClasses = "flex flex-col gap-1.5";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400 text-[0.95rem]">
        Loading...
      </div>
    );
  }

  if (notFound || !id) {
    return (
      <Container>
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-[0.95rem]">Student not found.</p>
          <Link
            href="/students"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg mt-4 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            ← Back to Students
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-[560px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
          <Link
            href={`/students/${id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 no-underline"
          >
            ← View details
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
        >
          <div className={groupClasses}>
            <label className={labelClasses} htmlFor="name">
              Full Name
            </label>
            <input
              className={inputClasses}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div className={groupClasses}>
            <label className={labelClasses} htmlFor="age">
              Age
            </label>
            <input
              className={inputClasses}
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              inputMode="numeric"
              placeholder="e.g. 20"
            />
          </div>

          <div className={groupClasses}>
            <label className={labelClasses} htmlFor="course">
              Course
            </label>
            <input
              className={inputClasses}
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              placeholder="e.g. B.Tech CSE"
            />
          </div>

          <div className={groupClasses}>
            <label className={labelClasses} htmlFor="email">
              Email
            </label>
            <input
              className={inputClasses}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. aarav@vit.ac.in"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={groupClasses}>
              <label className={labelClasses} htmlFor="semester">
                Semester
              </label>
              <input
                className={inputClasses}
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
            <div className={groupClasses}>
              <label className={labelClasses} htmlFor="enrollmentYear">
                Enrollment Year
              </label>
              <input
                className={inputClasses}
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="feesPaid"
              checked={feesPaid}
              onChange={(e) => setFeesPaid(e.target.checked)}
              className="w-[18px] h-[18px] accent-indigo-600 cursor-pointer"
            />
            <label htmlFor="feesPaid" className="text-sm font-medium text-gray-500 cursor-pointer">
              Fees Paid
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm py-2 px-3 bg-red-500/5 rounded border border-red-500/15">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-indigo-600 border-none rounded-lg cursor-pointer transition-colors hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-70"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href={`/students/${id}`}
              className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg no-underline transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
