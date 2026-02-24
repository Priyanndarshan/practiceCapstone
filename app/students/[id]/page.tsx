"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Link from "next/link";

export default function StudentDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchStudent() {
        try {
            const res = await fetch(`/api/students/${id}`);

            if (!res.ok) {
                throw new Error("Student not found");
            }

            const data = await res.json();
            setStudent(data);
        } catch (err) {
            setError("Student not found");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure?");
        if (!confirmDelete) return;

        await fetch(`/api/students/${id}`, {
            method: "DELETE",
        });

        router.push("/students");
    }

    useEffect(() => {
        if (id) fetchStudent();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Student Details</h1>

            <p><strong>Name:</strong> {student?.name}</p>
            <p><strong>Age:</strong> {student?.age}</p>
            <p><strong>Course:</strong> {student?.course}</p>
            <p><strong>Email:</strong> {student?.email}</p>

            <div style={{ marginTop: "20px" }}>
                <Link href={`/students/${id}/edit`}>
                    <button>Edit</button>
                </Link>

                <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
                    Delete
                </button>

                <Link href="/students">
                    <button style={{ marginLeft: "10px" }}>
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}