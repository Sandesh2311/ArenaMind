# ArenaMind AI

AI Powered Smart Stadium Operations Platform for PromptWars Virtual 2026 Main Challenge 4.

ArenaMind AI is a FIFA-scale GenAI web application for smart stadium operations. It gives fans, organizers, and volunteers role-specific dashboards for crowd management, indoor navigation, multilingual help, live decision support, incidents, and resource allocation.

## Architecture

```text
React + Vite UI
  -> Role dashboards
  -> Hybrid AI assistant
      -> Local FAQ router for common stadium requests
      -> Gemini API for complex reasoning when VITE_GEMINI_API_KEY is configured
      -> Intelligent fallback for offline or failed model calls
  -> Venue simulation data, analytics charts, and safety workflows
  -> Vercel deployment
```

## Features

- Fan dashboard with seat finder, parking, food, washrooms, exits, lost and found, schedule, and route cards.
- Fan AI guidance with personalized match-day tips, navigation recommendations, and queue avoidance suggestions.
- Organizer dashboard with crowd heatmap, queue analytics, incidents, volunteers, alerts, emergency controls, and decision support AI.
- Tournament Operations Overview for organizers with active incidents, crowd density summary, volunteer availability, queue status, and recommended AI actions.
- AI-generated Next Best Action cards and Operational Insights derived from simulated stadium conditions.
- Volunteer dashboard with assigned tasks, AI task prioritization, emergency routing, translation help, navigation, and communications.
- Multilingual assistant modes for English, Hindi, Spanish, French, Portuguese, and Arabic.
- Local fallback responses for common FAQs so routine questions never call Gemini.
- Visible GenAI architecture status explaining local AI, Gemini usage, and deterministic fallback behavior.
- Dark glassmorphism SaaS UI with responsive layouts, charts, accessible controls, and keyboard focus states.

## Screenshots

Add deployment screenshots after running the app locally or on Vercel:

- Home and command center hero.
- Fan assistant and navigation route cards.
- Organizer crowd heatmap and incident dashboard.
- Volunteer task and communication dashboard.

## Setup

```bash
npm install
npm run dev
```

For Gemini-backed complex questions, copy `.env.example` to `.env.local` and set:

```bash
VITE_GEMINI_API_KEY=your_key_here
```

The app remains useful without this key because local and intelligent fallback responses are built in.

## Quality Commands

```bash
npm run build
npm test
```

## Deployment

Deploy on Vercel as a Vite application. Configure `VITE_GEMINI_API_KEY` as a Vercel environment variable for production model access.

## Future Scope

- Live venue telemetry ingestion.
- Real indoor positioning integration.
- Staff radio and ticketing system connectors.
- Audit logging for emergency actions.
- Role-based authentication and permission policies.

## Challenge Requirement Mapping

| Challenge Requirement | ArenaMind Feature |
|-----------------------|-------------------|
| Smart Stadiums | Unified venue command center, fan service finder, staff routing, and stadium simulation data. |
| Tournament Operations | Tournament Operations Overview with active incidents, density, volunteer availability, queue status, and AI actions. |
| GenAI-enabled Architecture | Hybrid local AI, Gemini escalation, cache, and role-aware fallback behavior shown in the app and architecture docs. |
| Crowd Management | Crowd heatmap, queue analytics, live alerts, queue avoidance suggestions, and Gate D risk recommendations. |
| Indoor Navigation | Fan route cards, staff emergency routes, gate-to-seat guidance, and alternate path recommendations. |
| Real-time Decision Support | AI Next Best Action cards, Operational Insights, live alerts, and emergency controls. |
| Multi-language Assistance | Assistant language selector plus volunteer translation suggestions for English, Hindi, Spanish, French, Portuguese, and Arabic. |
| Fans | Fan dashboard with services, match schedule, personalized tips, navigation, and queue avoidance. |
| Organizers | Organizer dashboard with command metrics, tournament overview, operational insights, incidents, and volunteers. |
| Volunteers | Volunteer dashboard with AI task prioritization, emergency routing, language help, assigned tasks, and communications. |
| On-ground Staff | Staff navigation, emergency routes, incident escalation, communication panel, and command-center dispatch recommendations. |
