// In-memory seed data used by the demo service layer.
// NOTE: This is not persisted to disk — any changes (add/edit/delete) will be lost
// when the dev server process restarts. For production you would use a database.
import { Student } from "@/types/student";

// Exported as `let` so service functions can mutate the array in-place.
export let students: Student[] = [
  { id: "1", name: "Aarav Sharma", age: 20, course: "B.Tech CSE", email: "aarav.sharma@vit.ac.in", semester: 4, enrollmentYear: 2024, feesPaid: true },
  // Additional sample entries are commented out to keep the default list small.
  // You can uncomment or add more objects here while learning.
  // { id: "2", name: "Priya Patel", age: 21, course: "B.Tech ECE", email: "priya.patel@srmist.edu.in", semester: 5, enrollmentYear: 2023, feesPaid: false },
  // { id: "3", name: "Rohan Mehta", age: 22, course: "B.Sc Mathematics", email: "rohan.mehta@du.ac.in", semester: 6, enrollmentYear: 2023, feesPaid: true },
  // { id: "4", name: "Ananya Krishnan", age: 19, course: "BBA", email: "ananya.k@christuniversity.in", semester: 2, enrollmentYear: 2025, feesPaid: true },
  // { id: "5", name: "Vikram Singh", age: 23, course: "M.Tech AI & ML", email: "vikram.singh@iitb.ac.in", semester: 3, enrollmentYear: 2024, feesPaid: false },
  // { id: "6", name: "Sneha Reddy", age: 20, course: "B.Tech IT", email: "sneha.reddy@bits-pilani.ac.in", semester: 4, enrollmentYear: 2024, feesPaid: true },
  // { id: "7", name: "Arjun Nair", age: 21, course: "B.Com Honours", email: "arjun.nair@srcc.du.ac.in", semester: 5, enrollmentYear: 2023, feesPaid: true },
  // { id: "8", name: "Kavya Iyer", age: 22, course: "M.Sc Data Science", email: "kavya.iyer@iitm.ac.in", semester: 3, enrollmentYear: 2024, feesPaid: false },
  // { id: "9", name: "Rahul Gupta", age: 20, course: "B.Tech Mechanical", email: "rahul.gupta@nitk.edu.in", semester: 4, enrollmentYear: 2024, feesPaid: true },
  // { id: "10", name: "Diya Banerjee", age: 19, course: "BA English", email: "diya.b@presiuniv.ac.in", semester: 2, enrollmentYear: 2025, feesPaid: false },
];