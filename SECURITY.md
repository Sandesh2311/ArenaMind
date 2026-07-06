# Security

ArenaMind AI is a client-side Vite application for simulated smart-stadium operations. This document describes the production security posture expected for the demo and the controls implemented in the repository.

## Threat Model

Primary assets:

- Gemini API key configured through deployment environment variables.
- Availability of the assistant and dashboards during match-day operations.
- Integrity of organizer, fan, volunteer, and on-ground staff guidance.
- Safety of user-provided assistant prompts rendered in the browser.

Primary threats:

- Prompt injection attempts that try to override system instructions or reveal hidden context.
- Oversized, malformed, or empty inputs that degrade service quality.
- Hanging or repeated remote AI requests that reduce availability.
- Raw provider errors or stack traces exposed to users.
- Accidental storage or logging of secrets.
- Unsafe HTML rendering or script injection through user-generated content.
- Dependency vulnerabilities in the frontend toolchain.

## Prompt Injection Protection

- User prompts are validated before local routing or Gemini calls.
- Common jailbreak patterns, instruction-overriding language, and secret-exfiltration requests are rejected before network calls.
- Gemini requests are wrapped in a controlled system template that treats the user prompt as untrusted delimited data.
- The template explicitly prohibits revealing hidden prompts, policies, API keys, tokens, system messages, and implementation details.
- Rejected injection-like prompts return a user-friendly validation message rather than reaching Gemini.

## API Safety

- Gemini is called only when `VITE_GEMINI_API_KEY` is configured and local FAQ routing cannot answer the prompt.
- Remote requests use `AbortController` with an 8 second timeout.
- Failed remote requests retry at most once.
- Timeouts, failed HTTP responses, malformed payloads, and empty model responses all fall back to local venue intelligence.
- Users receive generic fallback messages; raw provider statuses, stack traces, and implementation details are not exposed.

## Local Storage Policy

- The current application does not store secrets, API keys, prompts, or sensitive user information in `localStorage` or `sessionStorage`.
- In-memory caches are limited to harmless local/Gemini response caching for the active browser session.
- Future storage may contain only low-risk UI preferences or simulated assessment history.
- Secrets must remain in runtime environment variables and deployment provider configuration.

## Error Handling Strategy

- Validation errors return concise user-facing messages.
- Dynamic import and AI-service failures are caught and converted to safe fallback responses.
- Gemini transport and parsing failures use generic error strings.
- The app does not intentionally log prompts, API keys, tokens, provider payloads, or sensitive values.
- Production integrations for emergency controls should add authentication, authorization, audit logging, and operational approvals.

## Input Validation Strategy

- AI prompts must be strings, non-empty after trimming, plain text, and at most 600 characters.
- Prompt whitespace is normalized before AI routing.
- Malformed control characters are rejected.
- Role selection is restricted to `fan`, `organizer`, and `volunteer`.
- Language selection is restricted to English, Hindi, Spanish, French, Portuguese, and Arabic.
- Invalid role or language values fail closed to safe defaults.
- There are no search boxes, navigation free-text inputs, or additional form fields in the current application.

## Safe Rendering

- The app does not use `dangerouslySetInnerHTML`.
- User and model text are rendered through React text nodes, which escape HTML by default.
- Reflected fallback prompt text is sanitized and length-limited before display.

## Sensitive Data

- `.env.local` is ignored by Git and should contain only local developer configuration.
- `VITE_GEMINI_API_KEY` must be configured through local or deployment environment variables.
- Do not commit API keys, tokens, credentials, provider payloads, or production logs.
- Do not print secrets to the console or persist them in browser storage.

## Dependency Security

- Use `npm audit --audit-level=high` before release and remediate high or critical vulnerabilities where practical.
- Keep Vite, React, test tooling, and chart/icon dependencies current.
- Remove unused dependencies when found.
- Treat dependency updates as security-sensitive changes and re-run `npm test`, `npm run build`, and `npm audit`.
