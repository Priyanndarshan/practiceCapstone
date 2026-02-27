"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/container";
import { useStudentForm, inputBase, labelBase, groupBase } from "@/hooks/useStudentForm";

export default function EditStudentPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const router = useRouter();
  const form = useStudentForm();

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
        form.setFormFromStudent(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    if (!form.validate()) return;

    form.setSubmitting(true);
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getPayload()),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Failed to update student");
      }

      router.push(`/students/${id}`);
    } catch (err: unknown) {
      form.setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      form.setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-base text-gray-400">
        Loading...
      </div>
    );
  }

  if (notFound || !id) {
    return (
      <Container>
        <div className="py-12 text-center text-gray-400">
          <div className="mb-3 text-4xl">😕</div>
          <p className="text-base">Student not found.</p>
          <Link
            href="/students"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            ← Back to Students
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Edit Student</h1>
          <Link
            href={`/students/${id}`}
            className="text-sm font-medium text-indigo-600 no-underline hover:text-indigo-700"
          >
            ← View details
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className={groupBase}>
            <label className={labelBase} htmlFor="name">
              Full Name
            </label>
            <input
              className={inputBase}
              id="name"
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
              required
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div className={groupBase}>
            <label className={labelBase} htmlFor="age">
              Age
            </label>
            <input
              className={inputBase}
              id="age"
              value={form.age}
              onChange={(e) => form.setAge(e.target.value)}
              required
              inputMode="numeric"
              placeholder="e.g. 20"
            />
          </div>

          <div className={groupBase}>
            <label className={labelBase} htmlFor="course">
              Course
            </label>
            <input
              className={inputBase}
              id="course"
              value={form.course}
              onChange={(e) => form.setCourse(e.target.value)}
              required
              placeholder="e.g. B.Tech CSE"
            />
          </div>

          <div className={groupBase}>
            <label className={labelBase} htmlFor="email">
              Email
            </label>
            <input
              className={inputBase}
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => form.setEmail(e.target.value)}
              required
              placeholder="e.g. aarav@vit.ac.in"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className={groupBase}>
              <label className={labelBase} htmlFor="semester">
                Semester
              </label>
              <input
                className={inputBase}
                id="semester"
                value={form.semester}
                onChange={(e) => form.setSemester(e.target.value)}
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
                value={form.enrollmentYear}
                onChange={(e) => form.setEnrollmentYear(e.target.value)}
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
              checked={form.feesPaid}
              onChange={(e) => form.setFeesPaid(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-indigo-600"
            />
            <label
              htmlFor="feesPaid"
              className="cursor-pointer text-sm font-medium text-gray-500"
            >
              Fees Paid
            </label>
          </div>

          {form.error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {form.error}
            </p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={form.submitting}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-95 disabled:opacity-70"
            >
              {form.submitting ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href={`/students/${id}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
