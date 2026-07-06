import { GEMINI_ENDPOINT, SYSTEM_CONTEXT } from '../constants/app.js';
import { buildIntelligentFallback, getLocalResponse } from './fallbackResponses.js';
import { validatePrompt } from '../utils/validation.js';

const geminiResponseCache = new Map();

/**
 * Send complex prompts to Gemini while preserving an offline-first stadium FAQ path.
 * @param {{prompt: string, role: 'fan'|'organizer'|'volunteer', language: string}} params
 * @returns {Promise<{text: string, source: 'local'|'gemini'|'fallback', error?: string}>}
 */
export async function askArenaMind({ prompt, role, language }) {
  const validation = validatePrompt(prompt);
  if (!validation.ok) {
    return { text: validation.error, source: 'fallback', error: validation.error };
  }

  const requestCacheKey = `${role}:${language}:${validation.value.toLowerCase()}`;
  const cached = geminiResponseCache.get(requestCacheKey);
  if (cached) {
    return cached;
  }

  const local = getLocalResponse(validation.value, role);
  if (local.source === 'local') {
    const response = { text: local.text, source: 'local' };
    geminiResponseCache.set(requestCacheKey, response);
    return response;
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return {
      text: buildIntelligentFallback(validation.value, role),
      source: 'fallback',
      error: 'Gemini API key is not configured.'
    };
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${SYSTEM_CONTEXT}\nRole: ${role}\nLanguage: ${language}\nRequest: ${validation.value}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.35,
          topP: 0.9,
          maxOutputTokens: 420
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini request failed with ${response.status}`);
    }

    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    const answer = { text, source: 'gemini' };
    geminiResponseCache.set(requestCacheKey, answer);
    return answer;
  } catch (error) {
    const response = {
      text: buildIntelligentFallback(validation.value, role),
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown Gemini error.'
    };
    geminiResponseCache.set(requestCacheKey, response);
    return response;
  }
}
