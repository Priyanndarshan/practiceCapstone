// Service layer: business logic for students (commented line-by-line below).
// This module operates on an in-memory dataset and provides helper functions
// that API route handlers call to query and mutate student records.
import { students } from "@/data/mock/students"; // import demo data (in-memory array)
import { Student } from "@/types/student"; // import the Student TypeScript type

// QueryParams: describes accepted query parameters for listing students.
export type QueryParams = {
  page?: number; // optional page number (1-indexed)
  limit?: number; // optional page size (items per page)
  search?: string; // optional search string
  course?: string; // optional course filter
  fees?: "paid" | "unpaid" | ""; // optional fees status filter
};

// QueryResult: the shape returned by queryStudents (data + pagination + filters).
export type QueryResult = {
  data: Student[]; // page of student records
  total: number; // total number of matching records
  page: number; // current page number
  totalPages: number; // total pages available
  filters: {
    courses: string[]; // available course options for filters
  };
};

// MAX_LIMIT: safety cap to prevent extremely large page sizes.
const MAX_LIMIT = 100;

// queryStudents: main listing function. Accepts QueryParams and returns QueryResult.
export function queryStudents(params: QueryParams = {}): QueryResult {
  const page = Math.max(1, params.page || 1); // normalize page to at least 1
  const limit = Math.min(MAX_LIMIT, Math.max(1, params.limit || 6)); // normalize limit between 1 and MAX_LIMIT (default 6)
  const search = (params.search || "").trim().toLowerCase(); // normalize search term to lowercase
  const course = (params.course || "").trim(); // normalize course filter
  const fees = params.fees || ""; // normalize fees filter

  const courseSet = new Set<string>(); // collect unique course names for filter options
  const filtered: Student[] = []; // will hold students that pass all filters

  // iterate through the in-memory students array to filter
  for (const s of students) {
    courseSet.add(s.course); // record this student's course into the set

    // apply course filter if provided (skip non-matching)
    if (course && s.course !== course) continue;
    // apply fees filters: 'paid' keeps only students with feesPaid true
    if (fees === "paid" && !s.feesPaid) continue;
    // 'unpaid' keeps only students with feesPaid false
    if (fees === "unpaid" && s.feesPaid) continue;

    // apply text search across name, email, and course (case-insensitive)
    if (search) {
      const q = search; // alias
      // if none of the searchable fields include the query substring, skip this student
      if (
        !s.name.toLowerCase().includes(q) &&
        !s.email.toLowerCase().includes(q) &&
        !s.course.toLowerCase().includes(q)
      ) {
        continue;
      }
    }

    // if we reach here the student passed all filters — include them
    filtered.push(s);
  }

  const total = filtered.length; // total matching records after filtering
  const totalPages = Math.max(1, Math.ceil(total / limit)); // compute total pages
  const start = (page - 1) * limit; // starting index for current page
  const data = filtered.slice(start, start + limit); // slice out the current page of results

  const filters = {
    courses: ["all", ...Array.from(courseSet).sort()], // build course filter options including 'all'
  };

  // return the results along with pagination metadata and available filters
  return { data, total, page, totalPages, filters };
}

// getStudentById: find a student by id (returns undefined if not found)
export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

// deleteStudentById: remove a student from the in-memory array by id.
// Returns true if deletion happened, false if the id was not found.
export function deleteStudentById(id: string): boolean {
  const idx = students.findIndex((s) => s.id === id); // find index of record
  if (idx === -1) return false; // not found
  students.splice(idx, 1); // remove the item at index
  return true; // deletion successful
}

// updateStudentById: apply a partial update to a student record.
// Returns the updated student or undefined if not found.
export function updateStudentById(id: string, patch: Partial<Student>): Student | undefined {
  const s = students.find((st) => st.id === id); // find the student
  if (!s) return undefined; // not found
  Object.assign(s, patch); // merge the patch into the existing object
  return s; // return updated student
}

// addStudent: append a new student to the in-memory store and return it.
export function addStudent(student: Student): Student {
  students.push(student); // store new student
  return student; // return the same student object
}

