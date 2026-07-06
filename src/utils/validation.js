const MAX_QUERY_LENGTH = 600;

/**
 * Validate and normalize a user prompt before AI routing.
 * @param {string} value Raw user input.
 * @returns {{ok: boolean, value: string, error?: string}}
 */
export function validatePrompt(value) {
  if (typeof value !== 'string') {
    return { ok: false, value: '', error: 'Prompt must be text.' };
  }

  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) {
    return { ok: false, value: '', error: 'Enter a stadium question first.' };
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    return {
      ok: false,
      value: '',
      error: `Keep requests under ${MAX_QUERY_LENGTH} characters.`
    };
  }

  return { ok: true, value: trimmed };
}
