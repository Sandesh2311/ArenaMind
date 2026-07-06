# Security

- Secrets are never committed. Gemini uses `VITE_GEMINI_API_KEY` from runtime environment variables.
- User prompts are validated for type, blank content, and maximum length before AI routing.
- Gemini failures are caught and converted to safe fallback responses.
- The app does not use `dangerouslySetInnerHTML`.
- Emergency controls are represented as UI actions only; production integration should require authentication, authorization, and audit logging.
- Vercel environment variables should be scoped per environment.
