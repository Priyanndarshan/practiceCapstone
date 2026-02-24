"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Student } from "@/types/student";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchStudents() {
        try {
            const res = await fetch("/api/students");
            const data = await res.json();
            setStudents(data);
        } catch (error) {
            console.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        await fetch(`/api/students/${id}`, {
            method: "DELETE",
        });

        // Refresh list after delete
        fetchStudents();
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Students</h1>

            <Link href="/students/add">
                <button style={{ marginBottom: "20px" }}>Add Student</button>
            </Link>

            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student.id} style={{ marginBottom: "10px" }}>
                            <strong>{student.name}</strong> ({student.course})
                            <div>
                                <Link href={`/students/${student.id}`}>
                                    <button>View</button>
                                </Link>

                                <Link href={`/students/${student.id}/edit`}>
                                    <button>Edit</button>
                                </Link>

                                <button onClick={() => handleDelete(student.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}