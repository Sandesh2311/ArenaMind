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

## GenAI Decision Boundaries

- Local AI is used for deterministic stadium FAQs, fan queue guidance, indoor navigation recommendations, organizer overview cards, Next Best Actions, Operational Insights, and volunteer task guidance.
- Gemini is used for complex free-form reasoning after local matching fails and only when a configured API key is available.
- Fallback behavior is deterministic: unavailable Gemini calls return role-aware guidance from local simulated venue intelligence instead of blank or random output.
- Contextual recommendations are generated from `crowdZones`, `queueAnalytics`, `incidents`, and `volunteers`, so the product remains aligned with real-time decision support even without network access.

## Data Flow

Dashboards use static operational simulation data from `src/data/fanData.js`, `src/data/volunteerData.js`, `src/data/organizerCoreData.js`, and `src/data/organizerAnalyticsData.js`. This keeps the hackathon deliverable self-contained while leaving a clear path for live telemetry adapters.

## PromptWars Main Challenge 4 Mapping

| Requirement | Implementation |
|-------------|----------------|
| Smart Stadiums | Role dashboards combine fan services, staff routes, incidents, queues, and venue-wide operational state. |
| Tournament Operations | Organizer Tournament Operations Overview summarizes incidents, density, volunteers, queues, and recommended actions. |
| GenAI-enabled Architecture | Hybrid local AI, Gemini escalation, caching, validation, and deterministic fallback are implemented in `src/services/`. |
| Crowd Management | Crowd heatmap, live alerts, queue analytics, Gate D risk actions, and fan queue avoidance cards. |
| Indoor Navigation | Route cards for fans, staff emergency routes, seat guidance, medical route guidance, and alternate gate recommendations. |
| Real-time Decision Support | AI Next Best Action cards, Operational Insights, emergency controls, and role-specific assistant answers. |
| Multi-language Assistance | Language selector, multilingual assistant context, and volunteer language assistance suggestions. |
| Fans | Fan dashboard includes match-day tips, service finder, schedule, navigation, and queue avoidance. |
| Organizers | Organizer dashboard includes command metrics, tournament overview, incidents, alerts, volunteers, and AI insights. |
| Volunteers | Volunteer dashboard includes assigned tasks, AI prioritization, emergency routing, language help, and quick actions. |
| On-ground Staff | Staff-facing routes, escalation guidance, communication panel, and dispatch recommendations support ground teams. |
