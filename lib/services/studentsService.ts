import { students } from "@/data/mock/students";
import { Student } from "@/types/student";

export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  course?: string;
  years?: string[];
  fees?: "paid" | "unpaid" | "";
};

export type QueryResult = {
  data: Student[];
  total: number;
  page: number;
  totalPages: number;
  filters: {
    courses: string[];
    years: string[];
  };
};

const MAX_LIMIT = 100;

export function queryStudents(params: QueryParams = {}): QueryResult {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, params.limit || 6));
  const search = (params.search || "").trim().toLowerCase();
  const course = (params.course || "").trim();
  const years = params.years || [];
  const fees = params.fees || "";

  const courseSet = new Set<string>();
  const yearSet = new Set<number>();
  const filtered: Student[] = [];

  for (const s of students) {
    courseSet.add(s.course);
    yearSet.add(s.enrollmentYear);

    if (course && s.course !== course) continue;
    if (years.length > 0 && !years.includes(String(s.enrollmentYear))) continue;
    if (fees === "paid" && !s.feesPaid) continue;
    if (fees === "unpaid" && s.feesPaid) continue;

    if (search) {
      const q = search;
      if (
        !s.name.toLowerCase().includes(q) &&
        !s.email.toLowerCase().includes(q) &&
        !s.course.toLowerCase().includes(q)
      ) {
        continue;
      }
    }

    filtered.push(s);
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  const filters = {
    courses: ["all", ...Array.from(courseSet).sort()],
    years: ["all", ...Array.from(yearSet).sort((a, b) => b - a).map(String)],
  };

  return { data, total, page, totalPages, filters };
}

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function deleteStudentById(id: string): boolean {
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  students.splice(idx, 1);
  return true;
}

export function updateStudentById(id: string, patch: Partial<Student>): Student | undefined {
  const s = students.find((st) => st.id === id);
  if (!s) return undefined;
  Object.assign(s, patch);
  return s;
}

export function addStudent(student: Student): Student {
  students.push(student);
  return student;
}

