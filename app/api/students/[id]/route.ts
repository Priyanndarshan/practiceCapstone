import { NextResponse } from "next/server";
import { students } from "@/lib/students";
import { Student } from "@/types/student";

/**
 * GET /api/students/:id
 */
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const student = students.find((s) => s.id === id);

    if (!student) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(student);
}

/**
 * DELETE /api/students/:id
 */
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    students.splice(index, 1);

    return NextResponse.json({ message: "Deleted successfully" });
}

/**
 * PATCH /api/students/:id
 * Partial update
 */
export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const body = await req.json();

    const student = students.find((s) => s.id === id);

    if (!student) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Only update provided fields
    if (body.name !== undefined) {
        student.name = body.name.trim();
    }

    if (body.age !== undefined) {
        if (isNaN(Number(body.age))) {
            return NextResponse.json(
                { message: "Age must be a valid number" },
                { status: 400 }
            );
        }
        student.age = Number(body.age);
    }

    if (body.course !== undefined) {
        student.course = body.course.trim();
    }

    if (body.email !== undefined) {
        student.email = body.email.trim();
    }

    return NextResponse.json(student);
}