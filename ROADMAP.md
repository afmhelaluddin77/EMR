# EMR Monorepo Roadmap

A pragmatic plan to evolve this repository from shared packages and schema into a working EMR system.

## Phase 0 — Workspace Bootstrap (Now)
- Initialize Nx at the repository root (create `nx.json`, `tsconfig.base.json`)
- Configure TS path aliases for `@emr/ui` and `@emr/fhir-types`
- Add root linting and formatting setup using `@emr/eslint-config-custom`
- Create `.editorconfig` and `.nvmrc` (optional)

Deliverables:
- Nx initialized and builds passing
- Root scripts for install/build/lint/test

## Phase 1 — App Scaffolds
- Generate `emr-frontend` (React + Vite + Router + Vitest)
- Generate `emr-backend` (NestJS)
- Add `.env.example` for both apps
- Wire `@emr/ui` and `@emr/fhir-types` into frontend
- Add basic healthcheck route in backend

Deliverables:
- Both apps serve locally via `npx nx serve ...`
- End-to-end “Hello, world” path: frontend fetches backend healthcheck

## Phase 2 — Authentication & Users
- Backend: auth module (JWT + refresh), users module, RBAC scaffolding
- Database: Prisma models for users, roles, sessions
- Frontend: auth pages (login/logout), protected routes, role-guarded views
- Add integration tests for auth flow

Deliverables:
- Secure login/logout, role checks working
- Seed script for admin user

## Phase 3 — Core EMR Data
- Database: Patients, Appointments, Observations, Medications, Prescriptions
- Backend: CRUD endpoints for core entities (FHIR-aligned where feasible)
- Frontend: feature modules and pages for core workflows
- Add Prisma migrations and test fixtures

Deliverables:
- CRUD flows for core entities with optimistic UI where applicable
- Basic validation and error handling

## Phase 4 — Audit & Compliance
- Backend: audit logging middleware/service for key actions
- RBAC hardening, input validation, rate limiting, CORS, security headers
- Logging/monitoring setup

Deliverables:
- Audit trail persisted for sensitive operations
- Security checklist baseline met

## Phase 5 — Usability & UI Library
- Expand `@emr/ui` components for forms, tables, filters, charts
- Consistent theming and accessibility passes
- Frontend performance optimizations

Deliverables:
- Reusable UI kit integrated across features
- Lighthouse and performance budgets established

## Phase 6 — Reporting & Analytics
- Aggregated queries, basic dashboards
- Export (CSV/PDF) and print-friendly views
- Background jobs for heavy reports

Deliverables:
- Reports module with at least 2-3 key dashboards

## Phase 7 — Integrations (Stretch)
- FHIR interoperability endpoints
- Lab system integration
- Telemedicine/video (if in scope)

Deliverables:
- At least one external integration working end-to-end

## Non-Functional Workstreams (Ongoing)
- Testing: unit, integration, e2e with CI
- DevEx: storybook (optional) for `@emr/ui`, commit hooks, pre-commit linting
- Docs: usage guides, API docs, ADRs
- Security: periodic audits, dependency updates

---

Use this roadmap as a living document. Prioritize based on stakeholder needs and available resources.