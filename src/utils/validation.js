import { LANGUAGES, ROLES } from '../constants/app.js';

export const MAX_QUERY_LENGTH = 600;

const PROMPT_INJECTION_PATTERNS = Object.freeze([
  /\bignore\b.{0,40}\b(previous|prior|above|system|developer)\b.{0,40}\b(instruction|prompt|message|rule)s?\b/i,
  /\b(disregard|override|bypass)\b.{0,50}\b(system|developer|safety|instruction|prompt|policy|rule)s?\b/i,
  /\b(jailbreak|developer mode|dan mode|do anything now)\b/i,
  /\breveal\b.{0,40}\b(system|developer|hidden|internal)\b.{0,40}\b(prompt|instruction|message|policy|secret)s?\b/i,
  /\b(api[_ -]?key|secret|token|credential)s?\b.{0,40}\b(print|show|reveal|leak|dump|exfiltrate)\b/i
]);

const SAFE_TEXT_PATTERN = /^[\p{L}\p{N}\p{P}\p{Zs}\r\n\t]+$/u;

function normalizeText(value) {
  return value.trim().replace(/\s+/g, ' ');
}

/**
 * Remove control characters that should never be rendered back to users.
 * @param {string} value User-controlled text.
 * @param {number} maxLength Maximum returned length.
 * @returns {string}
 */
export function sanitizeDisplayText(value, maxLength = 160) {
  if (typeof value !== 'string') {
    return '';
  }

  const normalized = normalizeText(value.replace(/[\u0000-\u001f\u007f]/g, ' '));
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}...` : normalized;
}

/**
 * Validate and normalize a user prompt before AI routing.
 * @param {string} value Raw user input.
 * @returns {{ok: boolean, value: string, error?: string}}
 */
export function validatePrompt(value) {
  if (typeof value !== 'string') {
    return { ok: false, value: '', error: 'Prompt must be text.' };
  }

  const trimmed = normalizeText(value);
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

  if (!SAFE_TEXT_PATTERN.test(trimmed)) {
    return { ok: false, value: '', error: 'Use plain text for stadium questions.' };
  }

  if (PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return {
      ok: false,
      value: '',
      error: 'Ask a stadium operations question without overriding assistant instructions.'
    };
  }

  return { ok: true, value: trimmed };
}

/**
 * Validate role input before it reaches dashboard or AI logic.
 * @param {string} value Candidate role.
 * @returns {{ok: boolean, value: 'fan'|'organizer'|'volunteer'}}
 */
export function validateRole(value) {
  const allowedRoles = ROLES.map((role) => role.id);
  if (allowedRoles.includes(value)) {
    return { ok: true, value };
  }

  return { ok: false, value: 'fan' };
}

/**
 * Validate assistant language selection against the supported list.
 * @param {string} value Candidate language label.
 * @returns {{ok: boolean, value: string}}
 */
export function validateLanguage(value) {
  const allowedLanguages = LANGUAGES.map((language) => language.label);
  if (allowedLanguages.includes(value)) {
    return { ok: true, value };
  }

  return { ok: false, value: 'English' };
}
