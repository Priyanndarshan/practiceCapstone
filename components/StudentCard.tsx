import Link from "next/link";

type Props = {
  id: string;
  name: string;
  course: string;
  onDelete?: (id: string) => void;
};

export default function StudentCard({ id, name, course, onDelete }: Props) {
  return (
    <li className="card flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="muted text-sm">{course}</p>
      </div>

      <div className="mt-3 sm:mt-0 flex gap-2">
        <Link href={`/students/${id}`} className="btn-secondary">
          View
        </Link>
        <Link href={`/students/${id}/edit`} className="btn-secondary">
          Edit
        </Link>
        <button
          className="btn danger"
          onClick={() => onDelete && onDelete(id)}
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

