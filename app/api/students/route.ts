import { NextResponse } from "next/server";
import { students } from "@/lib/students";
import { Student } from "@/types/student";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";
    const course = searchParams.get("course") || "";

    // 1️⃣ Filter + Search
    let filtered = students.filter((s) => {
        if (course && s.course !== course) return false;

        if (search) {
            const q = search.toLowerCase();
            return (
                s.name.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q) ||
                s.course.toLowerCase().includes(q)
            );
        }

        return true;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);

    // 2️⃣ Pagination calculation
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = filtered.slice(start, end);

    return NextResponse.json({
        data: paginatedData,
        total,
        page,
        totalPages,
    });
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

        students.push(newStudent);

        return NextResponse.json(newStudent, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid request body" },
            { status: 400 }
        );
    }
}
