import Link from "next/link";

type Props = {
    id: string;
    name: string;
    course: string;
    email: string;
    semester: number;
    feesPaid: boolean;
    onDelete?: (id: string) => void;
};

export default function StudentCard({
    id,
    name,
    course,
    email,
    semester,
    feesPaid,
    onDelete,
}: Props) {
    return (
        <li className="student-card">
            <div className="student-card-info">
                <div className="student-card-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="student-card-name">{name}</p>
                    <p className="student-card-course">{course}</p>
                    <p className="student-card-meta">
                        {email} · Sem {semester}
                        <span className={`badge ${feesPaid ? "badge-success" : "badge-warning"}`}>
                            {feesPaid ? "Paid" : "Unpaid"}
                        </span>
                    </p>
                </div>
            </div>

            <div className="student-card-actions">
                <Link href={`/students/${id}`} className="btn-outline">
                    View
                </Link>
                <Link href={`/students/${id}/edit`} className="btn-outline">
                    Edit
                </Link>
                <button
                    className="btn-danger-sm"
                    onClick={() => onDelete && onDelete(id)}
                    aria-label={`Delete ${name}`}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
