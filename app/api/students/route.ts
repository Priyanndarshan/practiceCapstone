// Next.js route handlers use the edge-compatible `Request` and `Response` helpers.
// This file exposes two HTTP endpoints for `/api/students`:
// - GET: list students with filters & pagination
// - POST: create a new student
import { NextResponse } from "next/server";
import { queryStudents, addStudent } from "@/lib/services/studentsService";
import { Student } from "@/types/student";

// Handler: GET /api/students
// Purpose: parse query params, call service to get filtered/paginated students, return JSON.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // parse and normalize query parameters with safe defaults
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;
  const search = (searchParams.get("search") || "").trim();
  const course = (searchParams.get("course") || "").trim();
  const fees = (searchParams.get("fees") || "").trim(); // 'paid' | 'unpaid' | ''

  const result = queryStudents({
    page,
    limit,
    search,
    course,
    // year filter removed
    fees: (fees as "paid" | "unpaid" | ""),
  });

  // return a JSON response the frontend hook expects: { data, total, page, totalPages, filters }
  return NextResponse.json(result);
}

// Handler: POST /api/students
// Purpose: validate request body, create a Student object, persist via service, return 201.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // basic validation: ensure required fields are present (frontend already does client-side checks)
    const { name, age, course, email, semester, enrollmentYear } = body;

    if (!name || !age || !course || !email || !semester || !enrollmentYear) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // construct the Student object using the project's Student type
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name,
      age: Number(age),
      course,
      email,
      semester: Number(semester),
      enrollmentYear: Number(enrollmentYear),
      feesPaid: body.feesPaid === true,
    };

    // persist (in-memory for this demo) and return the created record
    addStudent(newStudent);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    // if parsing fails or unexpected shape, return 400
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
}
