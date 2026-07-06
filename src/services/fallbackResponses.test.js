import { describe, expect, it } from 'vitest';
import { buildIntelligentFallback, getLocalResponse } from './fallbackResponses.js';

describe('fallbackResponses', () => {
  it.each([
    ['Where is Gate B?', /Gate B/],
    ['Find my seat in section 214', /Section 214/],
    ['Nearest washroom', /Bay 207/],
    ['parking lot status', /Lot P3/],
    ['food stall wait', /North Market/],
    ['Emergency near Gate D', /Exit E2/],
    ['Translate to Spanish', /Por favor/],
    ['What is the waiting time?', /Gate C/]
  ])('answers common local FAQ: %s', (prompt, expectedText) => {
    const answer = getLocalResponse(prompt, 'fan');
    expect(answer.source).toBe('local');
    expect(answer.text).toMatch(expectedText);
  });

  it('returns no local answer for complex prompts', () => {
    const answer = getLocalResponse(
      'Compare current crowd telemetry with weather risk and generate a phased staffing plan for the next hour.',
      'organizer'
    );
    expect(answer.source).toBe('none');
  });

  it('uses role fallback for short unmatched prompts and caches the response', () => {
    const answer = getLocalResponse('brief ask', 'organizer');
    const cached = getLocalResponse('brief ask', 'organizer');

    expect(answer.source).toBe('local');
    expect(answer.text).toMatch(/Operational summary/);
    expect(cached).toBe(answer);
  });

  it('falls back to fan local guidance for an unexpected role', () => {
    const answer = getLocalResponse('tiny', 'unknown');

    expect(answer.source).toBe('local');
    expect(answer.text).toMatch(/seats, gates, amenities/i);
  });

  it('builds role-aware fallback text', () => {
    const answer = buildIntelligentFallback('complex request', 'volunteer');
    expect(answer).toMatch(/Volunteer guidance/);
    expect(answer).toMatch(/complex request/);
  });

  it('sanitizes long or unsafe fallback prompt text', () => {
    const answer = buildIntelligentFallback(`unsafe\u0000 ${'details '.repeat(40)}`, 'unknown');

    expect(answer).toMatch(/seats, gates, amenities/i);
    expect(answer).not.toContain('\u0000');
    expect(answer).toMatch(/\.\.\."/);
  });
});
