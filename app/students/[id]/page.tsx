// Page: /students/[id] - student details with delete/navigation.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Link from "next/link";
import Container from "@/components/layout/container";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStudent() {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error("Student not found");
      const data = await res.json();
      setStudent(data);
    } catch {
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    router.push("/students");
  }

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-16 text-base text-gray-400">
        Loading...
      </div>
    );

  if (error)
    return (
      <Container>
        <div className="py-12 text-center text-gray-400">
          <div className="mb-3 text-4xl">😕</div>
          <p className="text-base">{error}</p>
          <Link
            href="/students"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            ← Back to Students
          </Link>
        </div>
      </Container>
    );

  const btnSecondary =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95";
  const btnPrimary =
    "inline-flex items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-indigo-700 active:scale-95";
  const btnDanger =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-95";

  return (
    <Container>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-xl font-bold text-white">
              {student?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{student?.name}</h2>
              <p className="text-sm text-gray-500">{student?.course}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Age
              </span>
              <span className="text-base font-medium text-gray-900">
                {student?.age} years
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Email
              </span>
              <span className="text-base font-medium text-gray-900">
                {student?.email}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Semester
              </span>
              <span className="text-base font-medium text-gray-900">
                Semester {student?.semester}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Enrollment Year
              </span>
              <span className="text-base font-medium text-gray-900">
                {student?.enrollmentYear}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Fees Status
              </span>
              <span className="text-base font-medium text-gray-900">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide ${
                    student?.feesPaid
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {student?.feesPaid ? "Paid" : "Unpaid"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/students/${id}/edit`} className={`${btnPrimary} cursor-pointer`}>
            Edit Student
          </Link>
          <button type="button" onClick={handleDelete} className={btnDanger}>
            Delete
          </button>
          <Link href="/students" className={btnSecondary}>
            ← Back
          </Link>
        </div>
      </div>
    </Container>
  );
}
