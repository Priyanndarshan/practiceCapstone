# Project Guide — How to Read & Teach This Codebase

This guide explains the recommended order to read the frontend code and the key concepts to cover for each area. It's written for beginners and focuses on the student CRUD flow (list, add, view, edit, delete).

Recommended order
1. app entry & routing
   - Where pages live: `app/` maps to routes (e.g. `app/students` → `/students`).
   - Explain client/server components at a high level and `"use client"` usage.

2. API layer (server routes)
   - Files: `app/api/students/route.ts`, `app/api/students/[id]/route.ts`
   - Talk about HTTP verbs (GET, POST, PATCH, DELETE), validation, and delegating to services.

3. Services (business logic)
   - Files: `lib/services/studentsService.ts`, `data/mock/students.ts`
   - Explain in-memory data store, queryStudents (filter + pagination), and simple CRUD helpers.
   - Caveat: data is in-memory — changes reset on server restart.

4. Hooks (state & data fetching)
   - File: `hooks/useStudents.ts`
   - Explain local UI state, debounced search, URLSearchParams assembly, and how the hook exposes data + controls to pages.

5. Pages & UX flows
   - Files under `app/students/`:
     - `page.tsx` — list page: composes filters and student cards, handles delete.
     - `add/page.tsx` — add page: controlled form, client-side validation, POST -> redirect.
     - `[id]/page.tsx` — details page: fetch single student, delete -> redirect.
     - `[id]/edit/page.tsx` — edit page: fetch for initial values, PATCH updates.
   - Teaching points: controlled inputs, navigation, user feedback (loading/errors).

6. Components
   - `components/ui/student-card.tsx` — small presentational component with action handlers.
   - `components/filters/*` — simple form controls (SearchInput, CourseSelect, YearMultiSelect, FeesToggle).
   - `components/layout/header.tsx` — site header showing client-side state (mobile menu).

Per-file talking points (example bullets)
- What the file exports (component, hook, service).
- Inputs & outputs (props, parameters, returned value).
- Side effects (network calls, global mutations).
- Important implementation details (debouncing, pagination logic, in-memory mutation).

Manual smoke-test checklist
1. Start dev server: `npm run dev` (or `pnpm dev` / `yarn dev` depending on project).
2. Open http://localhost:3000/students
3. Verify student list loads and filters populate.
4. Add: click "+ Add Student", fill form, submit — confirm new student appears in list.
5. View: click a student's "View" — confirm details page shows correct info.
6. Edit: click "Edit", change a field, submit — confirm updated values on details page.
7. Delete: from list or details, delete a student and confirm it's removed.

Notes & maintenance
- Comments added across files are beginner-focused; they explain intent and should be kept up-to-date.
- For persistence across restarts, replace the in-memory `data/mock/students.ts` with a database or a simple JSON file plus read/write helpers.

Where to look next
- Add unit tests for `lib/services/studentsService.ts` (query + add/update/delete behavior).
- Add end-to-end tests for the main CRUD flows (e.g., Playwright or Cypress).

Enjoy teaching and exploring the code!

