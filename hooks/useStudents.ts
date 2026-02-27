import { useEffect, useState } from "react";
import { Student } from "@/types/student";

type UseStudentsReturn = {
  students: Student[];
  loading: boolean;
  query: string;
  setQuery: (v: string) => void;
  courses: string[];
  courseFilter: string;
  setCourseFilter: React.Dispatch<React.SetStateAction<string>>;
  feesFilter: string;
  setFeesFilter: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  refresh: () => Promise<void>;
  error?: string;
};

export function useStudents(initialLimit = 6): UseStudentsReturn {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [feesFilter, setFeesFilter] = useState<string>("all");
  const [error, setError] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const [courses, setCourses] = useState<string[]>(["all"]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 700);
    return () => clearTimeout(t);
  }, [query]);

  async function fetchStudents() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", limit.toString());
      params.set("search", debouncedQuery);
      if (courseFilter !== "all") params.set("course", courseFilter);
      if (feesFilter && feesFilter !== "all") {
        params.set("fees", feesFilter);
      }
      const res = await fetch(`/api/students?${params}`);
      const result = await res.json();

      setStudents(result.data || []);
      setTotalPages(result.totalPages ?? 1);
      if (result.filters) {
        setCourses(result.filters.courses || ["all"]);
      }
      setError(undefined);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, courseFilter, feesFilter]);

  useEffect(() => {
    fetchStudents();
  }, [page, limit, debouncedQuery, courseFilter, feesFilter]);

  return {
    students,
    loading,
    query,
    setQuery,
    courses,
    courseFilter,
    setCourseFilter,
    feesFilter,
    setFeesFilter,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    refresh: fetchStudents,
    error,
  };
}
