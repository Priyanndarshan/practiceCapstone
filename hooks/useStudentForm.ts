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
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function setFormFromStudent(s: Student | null) {
    if (!s) return;
    setName(s.name ?? "");
    setAge(String(s.age ?? ""));
    setCourse(s.course ?? "");
    setEmail(s.email ?? "");
    setSemester(String(s.semester ?? ""));
    setEnrollmentYear(String(s.enrollmentYear ?? ""));
    setFeesPaid(Boolean(s.feesPaid));
  }

  function validate(): boolean {
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
      return false;
    }
    if (isNaN(Number(age)) || Number(age) <= 0) {
      setError("Age must be a valid positive number.");
      return false;
    }
    if (isNaN(Number(semester)) || Number(semester) < 1 || Number(semester) > 10) {
      setError("Semester must be between 1 and 10.");
      return false;
    }
    return true;
  }

  function getPayload(): StudentFormPayload {
    return {
      name: name.trim(),
      age: Number(age),
      course: course.trim(),
      email: email.trim(),
      semester: Number(semester),
      enrollmentYear: Number(enrollmentYear),
      feesPaid,
    };
  }

  return {
    name,
    setName,
    age,
    setAge,
    course,
    setCourse,
    email,
    setEmail,
    semester,
    setSemester,
    enrollmentYear,
    setEnrollmentYear,
    feesPaid,
    setFeesPaid,
    error,
    setError,
    submitting,
    setSubmitting,
    setFormFromStudent,
    validate,
    getPayload,
  };
}
