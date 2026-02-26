// UI: StudentCard - presentational component for student info and actions.
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
    <li className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-shadow hover:border-indigo-200 hover:shadow-md sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-base font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">{name}</p>
          <p className="mt-0.5 text-sm text-gray-500">{course}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-400">
            {email} · Sem {semester}
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wide ${
                feesPaid
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {feesPaid ? "Paid" : "Unpaid"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-wrap gap-2 border-t border-gray-100 pt-3 sm:min-w-0 sm:w-auto sm:border-0 sm:pt-0">
        <Link
          href={`/students/${id}`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
        >
          View
        </Link>
        <Link
          href={`/students/${id}/edit`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center rounded-lg border border-red-200 bg-transparent px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => onDelete?.(id)}
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
