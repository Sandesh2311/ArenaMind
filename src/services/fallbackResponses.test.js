import { describe, expect, it } from 'vitest';
import { buildIntelligentFallback, getLocalResponse } from './fallbackResponses.js';

describe('fallbackResponses', () => {
  it('answers common gate questions locally', () => {
    const answer = getLocalResponse('Where is Gate B?', 'fan');
    expect(answer.source).toBe('local');
    expect(answer.text).toMatch(/Gate B/);
  });

  it('returns no local answer for complex prompts', () => {
    const answer = getLocalResponse(
      'Compare current crowd telemetry with weather risk and generate a phased staffing plan for the next hour.',
      'organizer'
    );
    expect(answer.source).toBe('none');
  });

  it('builds role-aware fallback text', () => {
    const answer = buildIntelligentFallback('complex request', 'volunteer');
    expect(answer).toMatch(/Volunteer guidance/);
    expect(answer).toMatch(/complex request/);
  });
});
