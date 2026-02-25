import { useEffect, useRef, useState } from "react";
import { Student } from "@/types/student";

type UseStudentsReturn = {
  students: Student[];
  loading: boolean;
  query: string;
  setQuery: (v: string) => void;
  courses: string[];
  years: string[];
  courseFilter: string;
  setCourseFilter: React.Dispatch<React.SetStateAction<string>>;
  yearFilters: string[];
  setYearFilters: React.Dispatch<React.SetStateAction<string[]>>;
  feesFilter: string;
  setFeesFilter: React.Dispatch<React.SetStateAction<string>>;
  isYearDropdownOpen: boolean;
  setIsYearDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  yearDropdownRef: React.RefObject<HTMLDivElement | null>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  refresh: () => Promise<void>;
  error?: string;
};

/* Hook: useStudents
   Responsibility:
   - Encapsulates client-side state for the Students page: query, filters, pagination.
   - Handles debounced search and calls the API to fetch paginated results.
   - Returns a small API for the UI to consume (students, loading, pagination controls).
*/
export function useStudents(initialLimit = 6): UseStudentsReturn {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [yearFilters, setYearFilters] = useState<string[]>([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement | null>(null);
  const [feesFilter, setFeesFilter] = useState<string>("all");
  const [error, setError] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  const [courses, setCourses] = useState<string[]>(["all"]);
  const [years, setYears] = useState<string[]>(["all"]);

  // debounce query (longer delay to avoid frequent refreshes while typing)
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
      if (yearFilters && yearFilters.length > 0) {
        yearFilters.forEach((y) => params.append("year", y));
      }
      if (feesFilter && feesFilter !== "all") {
        params.set("fees", feesFilter);
      }

      const res = await fetch(`/api/students?${params}`);
      const result = await res.json();
      setStudents(result.data || []);
      setTotalPages(result.totalPages ?? 1);
      if (result.filters) {
        setCourses(result.filters.courses || ["all"]);
        setYears(result.filters.years || ["all"]);
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

  // reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, courseFilter, yearFilters, feesFilter]);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedQuery, courseFilter, yearFilters, feesFilter]);

  return {
    students,
    loading,
    query,
    setQuery,
    courses,
    years,
    courseFilter,
    setCourseFilter,
    yearFilters,
    setYearFilters,
    feesFilter,
    setFeesFilter,
    isYearDropdownOpen,
    setIsYearDropdownOpen,
    yearDropdownRef,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    refresh: fetchStudents,
    error,
  };
}

