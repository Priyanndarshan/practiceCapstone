# Students App — Demo & Architecture Notes

Purpose
- Short summary to use when demoing the app to stakeholders: architecture, design choices, current optimizations, and recommended hard improvements for production.

High-level architecture
- Frontend (Next.js app, client components)
  - Pages: `app/students/page.tsx` — main list UI
  - Components: `components/filters/*`, `components/ui/*`, `components/layout/*`
  - Hooks: `hooks/useStudents.ts` — client-side state and API calls (debounced search, pagination)
- Backend (Next API routes)
  - `app/api/students/route.ts` — list + create
  - `app/api/students/[id]/route.ts` — get / patch / delete
- Service layer
  - `lib/services/studentsService.ts` — single-responsibility layer for querying and mutating the dataset
- Data
  - `data/mock/students.ts` — seed/mock dataset (in-memory)

Design patterns & principles used
- Separation of Concerns: UI <-> Hook <-> Service <-> Data (pages import hook, hook calls API, API uses service).
- Single-pass filtering: service computes filters + applies search/pagination in one loop to avoid repeated scans.
- Componentization: reusable filter components under `components/filters/`.
- Hook encapsulation: `useStudents` contains debouncing, pagination state and network calls.

Optimizations already applied
- Server-side filtering + pagination (API returns only the requested page).
- Debounced search (700ms) to avoid frequent requests while typing.
- Service layer for business logic, making routes thin and easier to test.
- Moved static data to `data/mock` to clarify intent.

Production-hard improvements (non-trivial)
- Replace in-memory data with a real database (Postgres/SQLite) and push filtering/pagination into DB queries (uses indexes and full-text search).
- Add request validation (Zod/Joi) and consistent error handling middleware.
- Add authentication/authorization and rate limits.
- Add caching (Redis/CDN) and observability (metrics, logging, tracing).
- Add automated tests (unit for service, integration for API, E2E for UI) and CI pipeline.

Demo script (quick)
1. Start dev server: `npm run dev` (Next.js).
2. Open `/students` page — show search, filters, and pagination.
3. Demonstrate that search is server-side (network tab) and is debounced.
4. Show the API response shape: `{ data, total, page, totalPages, filters }`.
5. Explain where to change behavior: `lib/services/studentsService.ts` (filter logic) and `hooks/useStudents.ts` (client debounce/pagination).

Files to open during demo
- `app/students/page.tsx` — UI and usage of filter components
- `hooks/useStudents.ts` — client-side orchestration
- `lib/services/studentsService.ts` — single-pass filtering & pagination
- `app/api/students/route.ts` — thin controller exposing service
- `data/mock/students.ts` — seed data

Contact
- Ask me to generate a one-slide diagram or a short talk script tailored for leaders.

