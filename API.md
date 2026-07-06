# API

ArenaMind AI uses a compact service layer to coordinate local response handling and optional Gemini-based reasoning. The public behavior is intentionally simple and predictable so that the experience remains transparent for demos and future extension.

## Service Overview

### `askArenaMind({ prompt, role, language })`

Primary service entry point for the AI assistant.

- Validates the prompt, role, and language.
- Checks for a local response match first.
- Calls Gemini only when a valid API key is configured and the prompt is not handled locally.
- Returns a safe fallback response if the model is unavailable.

Return shape:

```js
{
  text: 'Assistant response',
  source: 'local' | 'gemini' | 'fallback',
  error: 'Optional safe error detail'
}
```

### `getLocalResponse(prompt, role)`

Provides deterministic, role-aware responses for common stadium questions such as gate directions, seat guidance, parking, food, and safety guidance. This service keeps high-confidence interactions fast and offline-safe.

### `buildIntelligentFallback(prompt, role)`

Generates the fallback response used when Gemini is unavailable or returns an invalid result. The message remains operationally useful while avoiding raw provider errors.

## Environment Configuration

```bash
VITE_GEMINI_API_KEY=your_key_here
```

## Gemini Transport

The remote AI layer targets the Gemini generation endpoint and sends a bounded, validated request payload containing:

- System context for ArenaMind AI
- Role metadata
- Selected language
- User prompt content

## Response Contract

All AI services should return:

- `text`: the user-facing response
- `source`: the origin of the response
- `error`: optional metadata for logging or fallback diagnostics

## Notes for Future Integration

The current implementation is intentionally frontend-first. A future production version can replace the static service layer with authenticated backend APIs while preserving the same contract.
