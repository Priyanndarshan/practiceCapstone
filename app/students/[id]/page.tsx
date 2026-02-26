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
      <div className="flex items-center justify-center py-16 text-gray-400 text-[0.95rem]">
        Loading...
      </div>
    );

  if (error)
    return (
      <Container>
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">😕</div>
          <p className="text-[0.95rem]">{error}</p>
          <Link
            href="/students"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg mt-4 no-underline transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            ← Back to Students
          </Link>
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="max-w-[640px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">Student Details</h1>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-2xl flex items-center justify-center shrink-0">
              {student?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{student?.name}</h2>
              <p className="text-sm text-gray-500">{student?.course}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Age
              </span>
              <span className="text-[0.92rem] font-medium text-gray-900">
                {student?.age} years
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email
              </span>
              <span className="text-[0.92rem] font-medium text-gray-900">
                {student?.email}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Semester
              </span>
              <span className="text-[0.92rem] font-medium text-gray-900">
                Semester {student?.semester}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Enrollment Year
              </span>
              <span className="text-[0.92rem] font-medium text-gray-900">
                {student?.enrollmentYear}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Fees Status
              </span>
              <span className="text-[0.92rem] font-medium text-gray-900">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-[0.68rem] font-semibold rounded-full tracking-wide ${
                    student?.feesPaid
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {student?.feesPaid ? "Paid" : "Unpaid"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <Link
            href={`/students/${id}/edit`}
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-indigo-600 border-none rounded-lg no-underline transition-colors hover:bg-indigo-700 active:scale-[0.98]"
          >
            Edit Student
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-red-500 border-none rounded-lg cursor-pointer transition-colors hover:bg-red-600 active:scale-[0.98]"
          >
            Delete
          </button>
          <Link
            href="/students"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg no-underline transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98]"
          >
            ← Back
          </Link>
        </div>
      </div>
    </Container>
  );
}
