import { buildCacheKey } from '../utils/cache.js';
import { sanitizeDisplayText } from '../utils/validation.js';

const responses = Object.freeze([
  {
    patterns: [/\bgate\s*b\b/i, /\bwhere\b.*\bgate\b/i],
    response:
      'Gate B is on the east arrival plaza. From the main fan zone, follow the cyan wayfinding line for 4 minutes. Current wait is about 14 minutes.'
  },
  {
    patterns: [/\bfind\b.*\bseat\b/i, /\bseat\b/i, /\bsection\b/i],
    response:
      'Open your ticket QR and follow Gate B to Level 2. For Section 214, take the right escalator, turn at Bay 208, and continue to Row H.'
  },
  {
    patterns: [/\bwashroom\b|\brestroom\b|\btoilet\b/i],
    response:
      'The nearest washrooms are Level 2 Bay 207 and Level 1 Bay 104. Bay 207 has the shorter queue right now.'
  },
  {
    patterns: [/\bparking\b|\bcar\b|\blot\b/i],
    response:
      'Lot P3 is the best parking option at the moment with 18% availability. Use the blue pedestrian lane toward Gate D.'
  },
  {
    patterns: [/\bfood\b|\bstall\b|\beat\b|\bdrink\b|\bconcession\b/i],
    response:
      'North Market has the fastest food service with a 4 minute average wait. South Market is busier at 11 minutes.'
  },
  {
    patterns: [/\bemergency\b|\bmedical\b|\bexit\b|\bgate d\b/i],
    response:
      'For emergencies, move away from dense queues, alert the nearest steward, and proceed to Exit E2 or Medical Point M2. I have flagged Gate D as high priority.'
  },
  {
    patterns: [/\btranslate\b.*\bspanish\b/i],
    response:
      'Spanish: "Por favor siga la senalizacion azul hasta la Puerta B. Un voluntario puede ayudarle alli."'
  },
  {
    patterns: [/\bwaiting time\b|\bwait\b|\bqueue\b/i],
    response:
      'Current estimated waits: Gate A 8 minutes, Gate B 16 minutes, Gate C 5 minutes, Gate D 21 minutes. Gate C is the recommended alternate.'
  }
]);

const roleFallback = Object.freeze({
  fan:
    'I can help with seats, gates, amenities, parking, lost and found, match timing, and emergency exits. For the fastest route, include your gate or section.',
  organizer:
    'Operational summary: prioritize Gate D, redeploy two volunteers from South Market, open overflow lanes, and keep Medical M2 access clear.',
  volunteer:
    'Volunteer guidance: acknowledge the request, confirm location, keep the aisle clear, and escalate urgent safety or medical needs to command.'
});

const localResponseCache = new Map();

/**
 * Resolve common stadium FAQs locally so Gemini is not called unnecessarily.
 * @param {string} prompt Normalized prompt.
 * @param {'fan'|'organizer'|'volunteer'} role Active user role.
 * @returns {{source: 'local'|'none', text: string}}
 */
export function getLocalResponse(prompt, role = 'fan') {
  const cacheKey = buildCacheKey(role, prompt);
  const cached = localResponseCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const match = responses.find((item) => item.patterns.some((pattern) => pattern.test(prompt)));
  if (match) {
    const response = { source: 'local', text: match.response };
    localResponseCache.set(cacheKey, response);
    return response;
  }

  if (prompt.length < 24) {
    const response = { source: 'local', text: roleFallback[role] ?? roleFallback.fan };
    localResponseCache.set(cacheKey, response);
    return response;
  }

  const response = { source: 'none', text: '' };
  localResponseCache.set(cacheKey, response);
  return response;
}

/**
 * Creates a graceful answer when the remote model is unavailable.
 * @param {string} prompt Normalized prompt.
 * @param {'fan'|'organizer'|'volunteer'} role Active role.
 * @returns {string}
 */
export function buildIntelligentFallback(prompt, role) {
  const base = roleFallback[role] ?? roleFallback.fan;
  return `${base} I could not reach the remote model, so I used local venue intelligence for: "${sanitizeDisplayText(prompt)}".`;
}
