# API

ArenaMind AI calls Gemini directly from the browser when configured.

## Environment

```bash
VITE_GEMINI_API_KEY=your_key_here
```

## Gemini Request

Endpoint:

```text
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

The request includes:

- System context for ArenaMind AI.
- Active role: fan, organizer, or volunteer.
- Selected language.
- Validated user prompt.

## Local Fallback API

`askArenaMind({ prompt, role, language })` returns:

```js
{
  text: 'Assistant response',
  source: 'local' | 'gemini' | 'fallback',
  error: 'Optional safe error detail'
}
```
