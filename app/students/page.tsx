"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Student } from "@/types/student";
import Container from "@/components/layout/container";
import StudentCard from "@/components/ui/student-card";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [yearFilters, setYearFilters] = useState<string[]>([]);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const [feesFilter, setFeesFilter] = useState<string>("all");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  async function fetchStudents() {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: debouncedQuery,
        course: courseFilter === "all" ? "" : courseFilter,
      });

      const res = await fetch(`/api/students?${params}`);
      const result = await res.json();
      setStudents(result.data);
      setTotalPages(result.totalPages ?? 1);
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedQuery, courseFilter]);

  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      300
    );
    return () => clearTimeout(t);
  }, [query]);

  // Handle clicking outside the custom dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const courses = useMemo(() => {
    const setC = new Set<string>();
    students.forEach((s) => setC.add(s.course));
    return ["all", ...Array.from(setC).sort()];
  }, [students]);

  const years = useMemo(() => {
    const setY = new Set<number>();
    students.forEach((s) => setY.add(s.enrollmentYear));
    return ["all", ...Array.from(setY).sort((a, b) => b - a).map(String)];
  }, [students]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, courseFilter, yearFilters, feesFilter]);

  const filtered = useMemo(() => {
    // Data is now filtered & paginated server-side. Use the returned students directly.
    return students;
  }, [students]);

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    await fetch(`/api/students/${id}`, { method: "DELETE" });
    fetchStudents();
  }

  if (loading) {
    return <div className="loading-state">Loading students...</div>;
  }

  return (
    <Container>
      <div className="fade-up" style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Students</h1>
          <Link href="/students/add" className="btn btn-primary">
            + Add Student
          </Link>
        </div>

        {/* Search */}
        <div className="filter-bar">
          <input
            aria-label="Search students"
            placeholder="Search by name, email or course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Filters row */}
        <div className="filter-bar">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="form-input"
            aria-label="Filter by course"
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Courses" : c}
              </option>
            ))}
          </select>

          {/* Custom Multi-Select Dropdown for Years */}
          <div className="relative" ref={yearDropdownRef} style={{ position: 'relative' }}>
            <div
              className="form-input"
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none', background: '#fff', minWidth: '160px' }}
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              <span>
                {yearFilters.length === 0 ? "All Years" : `${yearFilters.length} Year(s) Selected`}
              </span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>▼</span>
            </div>

            {isYearDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '0.25rem',
                  width: '100%',
                  background: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 10,
                  padding: '0.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={yearFilters.length === 0}
                    onChange={() => setYearFilters([])}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: yearFilters.length === 0 ? 'var(--color-primary)' : 'var(--color-text)' }}>All Years</span>
                </label>

                {years.filter(y => y !== "all").map((y) => (
                  <label key={y} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={yearFilters.includes(y)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setYearFilters([...yearFilters, y]);
                        } else {
                          setYearFilters(yearFilters.filter(yr => yr !== y));
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.9rem' }}>{y}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <select
            value={feesFilter}
            onChange={(e) => setFeesFilter(e.target.value)}
            className="form-input"
            aria-label="Filter by fees status"
          >
            <option value="all">All Fees</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">No students found.</p>
          </div>
        ) : (
          <>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {filtered.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  course={student.course}
                  email={student.email}
                  semester={student.semester}
                  feesPaid={student.feesPaid}
                  onDelete={handleDelete}
                />
              ))}
            </ul>

            <div className="pagination">
              <div className="pagination-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  ← Previous
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={page >= totalPages}
                >
                  Next →
                </button>
              </div>

              <div className="pagination-info">
                <span>
                  Page {page} of {Math.max(1, totalPages)}
                </span>
                <span>·</span>
                <label htmlFor="perPage">Per page</label>
                <select
                  id="perPage"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="form-input"
                  style={{ width: 72 }}
                >
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
