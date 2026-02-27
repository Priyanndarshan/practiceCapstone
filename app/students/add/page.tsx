"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/container";
import { useStudentForm, inputBase, labelBase, groupBase } from "@/hooks/useStudentForm";

export default function AddStudentPage() {
  const router = useRouter();
  const {
    form,
    setForm,
    validate,
    getPayload,
    error,
    setError,
    submitting,
    setSubmitting,
  } = useStudentForm();

  const updateField = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    updateField(
      name as keyof typeof form,
      type === "checkbox" ? checked : value
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getPayload()),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Failed to create student");
      }

      router.push("/students");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Add Student</h1>
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
              name="name"
              value={form.name}
              onChange={handleChange}
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
              name="age"
              value={form.age}
              onChange={handleChange}
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
              name="course"
              value={form.course}
              onChange={handleChange}
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
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
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
                name="semester"
                value={form.semester}
                onChange={handleChange}
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
                name="enrollmentYear"
                value={form.enrollmentYear}
                onChange={handleChange}
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
              name="feesPaid"
              checked={form.feesPaid}
              onChange={handleChange}
              className="h-4 w-4 cursor-pointer accent-indigo-600"
            />
            <label
              htmlFor="feesPaid"
              className="cursor-pointer text-sm font-medium text-gray-500"
            >
              Fees Paid
            </label>
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

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
