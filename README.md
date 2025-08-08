## EMR Monorepo (WIP)

A modern Electronic Medical Records (EMR) monorepo intended to house a React (Vite) frontend, a NestJS backend, and shared packages for UI and FHIR-compliant TypeScript types.

This repository currently includes shared packages and an initial database schema, with application scaffolds to be completed.

### Status
- Monorepo intent: Nx-based workspace
- Current state: Packages and Prisma schema exist; Nx root config and app sources are not yet initialized
- OS note: `start-*.sh` scripts use `brew` for PostgreSQL (macOS). Adjust for Linux if needed.

## Repository Structure
```
/
├── apps/
│   ├── emr-frontend/
│   │   └── package.json            # Nx target metadata; src not yet created
│   └── emr-backend/
│       └── prisma/
│           └── schema.prisma       # Initial Prisma schema
├── packages/
│   ├── ui/                         # Shared React UI components (MUI v7)
│   │   ├── src/
│   │   │   ├── MedicalCard.tsx
│   │   │   ├── RoleBadge.tsx
│   │   │   └── VitalsChart.tsx
│   │   └── package.json
│   ├── fhir-types/                 # FHIR-compliant TS types
│   │   ├── src/
│   │   │   ├── appointment.ts
│   │   │   ├── medication.ts
│   │   │   ├── observation.ts
│   │   │   ├── patient.ts
│   │   │   ├── practitioner.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── eslint-config-custom/       # Shared ESLint config
│       ├── index.js
│       └── package.json
├── start-dev.sh                    # Convenience script (assumes Nx + macOS brew)
├── start-servers.sh                # Convenience script (assumes Nx + macOS brew)
├── SETUP_SUMMARY.md                # Prior setup notes (informational)
└── README.md                       # You are here
```

## Tech Overview (intended)
- Frontend: React 18 + TypeScript, Vite, MUI v7, React Router, TanStack Query
- Backend: NestJS + TypeScript, Prisma ORM + PostgreSQL, JWT auth, RBAC
- Shared: `@emr/ui` components, `@emr/fhir-types`, shared ESLint config

## Getting Started (bootstrap plan)
Until the Nx workspace is initialized at the repository root, commands like `nx serve` will not work. Use the following plan to bootstrap locally:

1) Initialize Nx in this repo
```
npx nx@latest init --useDotNxFolder
```
This will create root Nx configs (e.g., `nx.json`, `tsconfig.base.json`) and set up the workspace.

2) Generate applications
```
# Frontend (React + Vite)
npx nx g @nx/react:app emr-frontend --bundler=vite --style=css --routing --unitTestRunner=vitest

# Backend (NestJS)
npx nx g @nx/nest:app emr-backend
```

3) Wire shared packages
- Ensure `paths` in root `tsconfig.base.json` map `@emr/ui` and `@emr/fhir-types` to `packages/ui/src` and `packages/fhir-types/src`
- In each app, import from the packages using those aliases

4) Environment variables
- Backend: create `apps/emr-backend/.env` with `DATABASE_URL="postgresql://USER:PASS@localhost:5432/emr_db"`
- Consider adding `.env.example` files for both apps

5) Database
```
# From repo root
cd apps/emr-backend
npx prisma generate
npx prisma migrate dev
cd -
```

6) Run apps
```
# Once Nx is initialized and apps are generated
npx nx serve emr-backend
npx nx serve emr-frontend
```

Notes
- The provided `start-dev.sh` / `start-servers.sh` assume macOS (`brew`) and a ready Nx workspace. Adapt for Linux or run services manually.
- Use PostgreSQL 14+.
- Windows: use `./start-dev.ps1` (PowerShell) to run with Dockerized PostgreSQL.

## Packages
- `@emr/ui`: Shared MUI-based components (e.g., `MedicalCard`, `RoleBadge`, `VitalsChart`)
- `@emr/fhir-types`: FHIR R4-aligned TypeScript types for patient, appointment, observation, medication, practitioner
- `@emr/eslint-config-custom`: Opinionated ESLint rules for TS/React/Nx

## Development
- After bootstrapping Nx:
  - Serve: `npx nx serve emr-frontend` | `npx nx serve emr-backend`
  - Build: `npx nx build <project>`
  - Test: `npx nx test <project>`
  - Lint: `npx nx lint <project>`

## Roadmap
See `ROADMAP.md` for milestones and prioritized next steps.

## License
MIT (add `LICENSE` file if not present).
