# Code Quality

## Architecture Principles

- Keep UI components focused on rendering and local interaction only.
- Keep cross-cutting state in hooks.
- Keep AI, validation, and fallback routing in services/utilities.
- Prefer role-specific data modules over aggregate data files.
- Preserve lazy-loading boundaries for dashboards, AI service code, and chart-heavy modules.

## Folder Responsibilities

- `src/components`: Reusable UI, landing page, and role dashboards.
- `src/components/dashboards/organizer`: Focused organizer analytics sections.
- `src/hooks`: Reusable React state and interaction logic.
- `src/services`: AI orchestration and fallback response services.
- `src/utils`: Pure helpers such as validation and cache-key generation.
- `src/constants`: Stable application and assistant configuration.
- `src/data`: Static venue, role, and analytics data.

## Design Decisions

- Dashboard role and language state live in `useDashboardPreferences`.
- Assistant conversation state lives in `useArenaAssistant`; Gemini code is dynamically imported only when a prompt is submitted.
- Organizer analytics sections are split into child components to keep `OrganizerDashboard` as a coordinator.
- Local FAQ routing remains separate from Gemini orchestration so common questions never require a model call.

## Refactoring Summary

- Removed duplicated aggregate stadium data in favor of role-specific data modules.
- Extracted organizer heatmap, queue analytics, incidents, alerts, and volunteer monitoring sections.
- Added ESLint 9 flat config and React Hooks validation.
- Added cache-key utility to avoid duplicated cache string construction.
- Added JSDoc to exported hooks, services, utilities, and complex components.

## Maintainability Strategy

- Add new role modules under the role dashboard folder and keep shared UI in `components/ui`.
- Add new assistant routing rules inside `fallbackResponses.js` without coupling them to Gemini.
- Keep new constants either global in `constants` or local to the module that owns the behavior.
- Run `npm run lint`, `npm test`, and `npm run build` before release.
