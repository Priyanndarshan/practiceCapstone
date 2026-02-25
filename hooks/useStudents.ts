import { useEffect, useRef, useState } from "react"; // React hooks used by the custom hook
import { Student } from "@/types/student"; // Shared TypeScript type for student shape

type UseStudentsReturn = { // Defines the shape of the object returned by the hook
  students: Student[]; // array of students to render
  loading: boolean; // boolean flag while fetching
  query: string; // current search input value
  setQuery: (v: string) => void; // setter to update search input
  courses: string[]; // available course filter options
  courseFilter: string; // current selected course filter
  setCourseFilter: React.Dispatch<React.SetStateAction<string>>; // setter for courseFilter
  feesFilter: string; // fees filter value
  setFeesFilter: React.Dispatch<React.SetStateAction<string>>; // setter for feesFilter
  page: number; // current pagination page
  setPage: React.Dispatch<React.SetStateAction<number>>; // setter for page
  limit: number; // items per page
  setLimit: React.Dispatch<React.SetStateAction<number>>; // setter for limit
  totalPages: number; // total pages returned by API (if supported)
  refresh: () => Promise<void>; // function to re-fetch data manually
  error?: string; // optional error message
};

/* Hook: useStudents
   Responsibility:
   - Encapsulates client-side state for the Students page: query, filters, pagination.
   - Handles debounced search and calls the API to fetch paginated results.
   - Returns a small API for the UI to consume (students, loading, pagination controls).
*/
export function useStudents(initialLimit = 6): UseStudentsReturn { // hook factory with default page size
  // Data + loading state (what the UI consumes directly)
  const [students, setStudents] = useState<Student[]>([]); // students array state
  const [loading, setLoading] = useState(false); // loading indicator state

  // Search text entered by the user and a debounced version used for requests.
  // Debouncing prevents a network call on every keystroke.
  const [query, setQuery] = useState(""); // raw query typed by user
  const [debouncedQuery, setDebouncedQuery] = useState(""); // debounced query used for API calls

  // Filters and UI state: controlled by filter components on the page.
  const [courseFilter, setCourseFilter] = useState<string>("all"); // selected course or 'all'
  const [feesFilter, setFeesFilter] = useState<string>("all"); // fees filter value
  const [error, setError] = useState<string | undefined>(undefined); // error message if fetch fails

  // Pagination state: current page, page size, and total pages.
  const [page, setPage] = useState(1); // active page number (1-indexed)
  const [limit, setLimit] = useState(initialLimit); // page size (items per page)
  const [totalPages, setTotalPages] = useState(1); // total number of pages available

  // Available filter options computed from the dataset (populated by the API).
  const [courses, setCourses] = useState<string[]>(["all"]); // course dropdown options

  // debounce query (longer delay to avoid frequent refreshes while typing)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 700); // set debouncedQuery after 700ms
    return () => clearTimeout(t); // cleanup timeout on query change
  }, [query]); // re-run when `query` changes

  // fetchStudents: builds URLSearchParams from current filters and calls the API.
  // It updates students, pagination info and available filter lists.
  async function fetchStudents() {
    try {
      setLoading(true); // indicate request in flight
      const params = new URLSearchParams(); // build query params for API
      params.set("page", page.toString()); // include page
      params.set("limit", limit.toString()); // include limit
      params.set("search", debouncedQuery); // include debounced search term
      if (courseFilter !== "all") params.set("course", courseFilter); // include course if filtered
      // year filter removed
      if (feesFilter && feesFilter !== "all") {
        params.set("fees", feesFilter); // include fees filter if set
      }

      const res = await fetch(`/api/students?${params}`); // call API with constructed params
      const result = await res.json(); // parse JSON response
      setStudents(result.data || []); // update students state (fallback to empty array)
      setTotalPages(result.totalPages ?? 1); // update totalPages if provided by API
      if (result.filters) {
        // API returns 'courses' to populate filter controls
        setCourses(result.filters.courses || ["all"]); // populate course options
      }
      setError(undefined); // clear previous error on success
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err); // stringify error
      setError(message); // set error state for UI
      console.error("Failed to fetch students", err); // log for debugging
    } finally {
      setLoading(false); // always turn off loading indicator
    }
  }

  // When the search or filters change we reset the page back to 1 so users
  // always see the first page of new results.
  useEffect(() => {
    setPage(1); // reset pagination to first page when filters/search change
  }, [debouncedQuery, courseFilter, feesFilter]); // dependencies that trigger reset

  // Main effect: fetch data whenever relevant inputs change (page, limit, filters).
  useEffect(() => {
    fetchStudents(); // fetch current page with current filters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedQuery, courseFilter, feesFilter]); // re-run when any of these change

  return { // expose hook API to consuming components
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

