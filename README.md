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
- Organizer dashboard with crowd heatmap, queue analytics, incidents, volunteers, alerts, emergency controls, and decision support AI.
- Volunteer dashboard with assigned tasks, emergency requests, translation help, navigation, and communications.
- Multilingual assistant modes for English, Hindi, Spanish, French, Portuguese, and Arabic.
- Local fallback responses for common FAQs so routine questions never call Gemini.
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
