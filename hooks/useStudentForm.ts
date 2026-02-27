import { useState } from "react";
import type { Student } from "@/types/student";

export const inputBase =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200";
export const labelBase = "text-sm font-semibold text-gray-500";
export const groupBase = "flex flex-col gap-1.5";

export type StudentFormPayload = {
  name: string;
  age: number;
  course: string;
  email: string;
  semester: number;
  enrollmentYear: number;
  feesPaid: boolean;
};

export function useStudentForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
    semester: "",
    enrollmentYear: "",
    feesPaid: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setFormFromStudent(s: Student | null) {
    if (!s) return;
    setForm({
      name: s.name ?? "",
      age: String(s.age ?? ""),
      course: s.course ?? "",
      email: s.email ?? "",
      semester: String(s.semester ?? ""),
      enrollmentYear: String(s.enrollmentYear ?? ""),
      feesPaid: Boolean(s.feesPaid),
    });
  }

  function validate(): boolean {
    setError(null);
    if (
      !form.name.trim() ||
      !form.age.trim() ||
      !form.course.trim() ||
      !form.email.trim() ||
      !form.semester.trim() ||
      !form.enrollmentYear.trim()
    ) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(form.age)) || Number(form.age) <= 0) {
      setError("Age must be a valid positive number.");
      return false;
    }
    if (isNaN(Number(form.semester)) || Number(form.semester) < 1 || Number(form.semester) > 10) {
      setError("Semester must be between 1 and 10.");
      return false;
    }
    return true;
  }

  function getPayload(): StudentFormPayload {
    return {
      name: form.name.trim(),
      age: Number(form.age),
      course: form.course.trim(),
      email: form.email.trim(),
      semester: Number(form.semester),
      enrollmentYear: Number(form.enrollmentYear),
      feesPaid: form.feesPaid,
    };
  }

  return {
    form,
    setForm,
    error,
    setError,
    submitting,
    setSubmitting,
    setFormFromStudent,
    validate,
    getPayload,
  };
}
