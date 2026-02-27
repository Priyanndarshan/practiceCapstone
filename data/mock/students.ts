import { Student } from "@/types/student";

const INITIAL_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    age: 20,
    course: "B.Tech CSE",
    email: "aarav.sharma@vit.ac.in",
    semester: 4,
    enrollmentYear: 2024,
    feesPaid: true,
  },
];

declare global {
  var __STUDENTS_STORE__: Student[] | undefined;
}

if (typeof globalThis.__STUDENTS_STORE__ === "undefined") {
  globalThis.__STUDENTS_STORE__ = [...INITIAL_STUDENTS];
}

export const students = globalThis.__STUDENTS_STORE__;
