# Orbit — AI Academic Planner

Orbit unifies Canvas assignments, Google Calendar events, public university pages, and manual tasks. Gemini is a server-side planning layer; PostgreSQL remains the source of truth.

## Local setup

1. Copy `.env.example` to `.env` and add `GEMINI_API_KEY` to enable live AI responses. Leave `DEMO_MODE=true` for a no-credentials walkthrough.
2. Start PostgreSQL with `docker compose up -d` (optional for demo mode).
3. Install dependencies with `npm install`, then run `npm run dev`.
4. For persistent data, run `npm run db:migrate` and `npm run db:seed`.

Open `http://localhost:3000/planner`. Demo mode provides seeded Canvas, Calendar, and web data. Configure Google OAuth (`AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET`) to enable Calendar sync; Canvas accepts a base URL and personal token through its server-side adapter.

## Architecture

External providers map through adapters into normalized `PlannerItem` records. The deterministic planner engine avoids fixed events and deadlines before Gemini proposes study blocks. Web extraction is server-side, Zod-validated, and requires explicit approval before an item is stored.

## Checks

Run `npm test` for the planner engine and schema validation tests, and `npm run build` for a production build.
