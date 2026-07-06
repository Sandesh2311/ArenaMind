# Architecture

ArenaMind AI uses a modular React architecture shaped around venue operations.

## Layers

```text
src/
  components/        Shared UI, landing page, dashboards
  constants/         App-wide constants and Gemini endpoint
  data/              Stadium simulation data and operational content
  hooks/             React hooks for assistant state
  services/          Gemini and local fallback orchestration
  styles/            Tailwind entry and global CSS
  test/              Test setup
  utils/             Validation and pure helpers
```

## AI Flow

1. The assistant validates and normalizes input.
2. Common stadium FAQs are answered by `getLocalResponse`.
3. Complex prompts call Gemini only when `VITE_GEMINI_API_KEY` is configured.
4. Failed or unavailable model calls return role-aware fallback guidance.

This reduces cost and latency while preserving graceful offline behavior.

## Data Flow

Dashboards use static operational simulation data from `src/data/stadiumData.js`. This keeps the hackathon deliverable self-contained while leaving a clear path for live telemetry adapters.
