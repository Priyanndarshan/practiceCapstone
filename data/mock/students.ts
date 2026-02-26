// In-memory store that survives HMR: we keep the array on globalThis so when the
// module is re-executed (e.g. hot reload), we reuse the same array instead of resetting.
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
  // eslint-disable-next-line no-var
  var __STUDENTS_STORE__: Student[] | undefined;
}

// Use a single global array so add/edit/delete persist across page reloads and HMR.
if (typeof globalThis.__STUDENTS_STORE__ === "undefined") {
  globalThis.__STUDENTS_STORE__ = [...INITIAL_STUDENTS];
}

export const students = globalThis.__STUDENTS_STORE__;
