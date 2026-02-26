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
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl py-3.5 px-4 transition-shadow hover:shadow-md hover:border-indigo-500/15">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-base flex items-center justify-center shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-[0.9rem] font-semibold text-gray-900">{name}</p>
          <p className="text-[0.78rem] text-gray-500 mt-0.5">{course}</p>
          <p className="text-[0.72rem] text-gray-400 mt-0.5 flex items-center gap-1.5">
            {email} · Sem {semester}
            <span
              className={`inline-flex items-center px-2 py-0.5 text-[0.68rem] font-semibold rounded-full tracking-wide ${
                feesPaid
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {feesPaid ? "Paid" : "Unpaid"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 flex-wrap w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-gray-100 sm:border-0 sm:min-w-0">
        <Link
          href={`/students/${id}`}
          className="inline-flex items-center justify-center py-1.5 px-3 text-[0.78rem] font-medium text-gray-500 bg-transparent border border-gray-200 rounded transition-colors hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50"
        >
          View
        </Link>
        <Link
          href={`/students/${id}/edit`}
          className="inline-flex items-center justify-center py-1.5 px-3 text-[0.78rem] font-medium text-gray-500 bg-transparent border border-gray-200 rounded transition-colors hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center py-1.5 px-3 text-[0.78rem] font-medium text-red-500 bg-transparent border border-red-500/25 rounded transition-colors hover:bg-red-500 hover:text-white hover:border-red-500"
          onClick={() => onDelete?.(id)}
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
