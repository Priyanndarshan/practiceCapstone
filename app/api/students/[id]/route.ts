// Route handlers for a single student resource at `/api/students/:id`.
// Each handler reads the `id` from the route params and delegates to the service layer.
import { NextResponse } from "next/server";
import { getStudentById, deleteStudentById, updateStudentById } from "@/lib/services/studentsService";

// GET /api/students/:id
// Purpose: retrieve a single student by id and return 404 if missing.
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const student = getStudentById(id);

  if (!student) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

// DELETE /api/students/:id
// Purpose: remove a student from the in-memory store and return success/failure.
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const ok = deleteStudentById(id);
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted successfully" });
}

// PATCH /api/students/:id
// Purpose: perform a partial update. The service merges the provided fields.
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const patched = updateStudentById(id, body);
  if (!patched) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(patched);
}