import { NextResponse } from "next/server";
import { students } from "@/lib/students";
import { Student } from "@/types/student";
import { v4 as uuid } from "uuid";

export async function GET() {
    return NextResponse.json(students);

}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, age, course, email } = body;

        // Basic validation
        if (!name || !age || !course || !email) {
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

