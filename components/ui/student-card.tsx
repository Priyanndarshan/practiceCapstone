// UI: StudentCard
// Small presentational component that renders student info and action buttons.
// Each line below includes a short comment explaining its purpose.
import Link from "next/link"; // Next.js Link for client-side navigation

type Props = {
  id: string; // student id (used for links and actions)
  name: string; // student name to display
  course: string; // course name to display
  email: string; // email to display in metadata
  semester: number; // semester number to display
  feesPaid: boolean; // whether fees are paid (affects badge)
  onDelete?: (id: string) => void; // optional delete callback passed from parent
};

export default function StudentCard({
  id, // student's id
  name, // student's name
  course, // student's course
  email, // student's email
  semester, // student's semester
  feesPaid, // boolean for fees status
  onDelete, // optional delete handler
}: Props) {
  return (
    <li className="student-card"> {/* list item wrapper for the card */}
      <div className="student-card-info"> {/* left side: avatar + basic info */}
        <div className="student-card-avatar"> {/* visual avatar showing initial */}
          {name.charAt(0).toUpperCase() /* first initial from name */ }
        </div>
        <div> {/* textual info block */}
          <p className="student-card-name">{name /* display full name */}</p>
          <p className="student-card-course">{course /* display course */}</p>
          <p className="student-card-meta"> {/* meta row: email, semester, fees badge */}
            {email} · Sem {semester}
            <span className={`badge ${feesPaid ? "badge-success" : "badge-warning"}` /* choose badge style based on feesPaid */}>
              {feesPaid ? "Paid" : "Unpaid" /* show Paid/Unpaid text */}
            </span>
          </p>
        </div>
      </div>

      <div className="student-card-actions"> {/* right side: action buttons */}
        <Link href={`/students/${id}`} className="btn-outline"> {/* client nav to detail page */}
          View
        </Link>
        <Link href={`/students/${id}/edit`} className="btn-outline"> {/* client nav to edit page */}
          Edit
        </Link>
        <button
          className="btn-danger-sm" // small red delete button
          onClick={() => onDelete && onDelete(id) /* call parent-supplied delete if present */}
          aria-label={`Delete ${name}`} // accessible label for screen readers
        >
          Delete
        </button>
      </div>
    </li>
  );
}
