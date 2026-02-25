import { NextResponse } from "next/server";
import { queryStudents, addStudent } from "@/lib/services/studentsService";
import { Student } from "@/types/student";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
  const search = (searchParams.get("search") || "").trim();
  const course = (searchParams.get("course") || "").trim();
  const years = searchParams.getAll("year"); // multiple year params allowed
  const fees = (searchParams.get("fees") || "").trim(); // 'paid' | 'unpaid' | ''

  const result = queryStudents({
    page,
    limit,
    search,
    course,
    years,
    fees: (fees as "paid" | "unpaid" | ""),
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, age, course, email, semester, enrollmentYear } = body;

        if (!name || !age || !course || !email || !semester || !enrollmentYear) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

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

        addStudent(newStudent);

        return NextResponse.json(newStudent, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid request body" },
            { status: 400 }
        );
    }
}
