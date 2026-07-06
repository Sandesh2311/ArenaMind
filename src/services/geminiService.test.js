import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { askArenaMind } from './geminiService.js';

const originalKey = import.meta.env.VITE_GEMINI_API_KEY;

describe('geminiService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    import.meta.env.VITE_GEMINI_API_KEY = originalKey;
    vi.unstubAllGlobals();
  });

  it('returns validation errors without calling Gemini', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const answer = await askArenaMind({ prompt: ' ', role: 'fan', language: 'English' });

    expect(answer.source).toBe('fallback');
    expect(answer.text).toMatch(/Enter a stadium question/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('uses local FAQ routing before Gemini', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    import.meta.env.VITE_GEMINI_API_KEY = 'test-key';

    const answer = await askArenaMind({ prompt: 'Nearest washroom', role: 'fan', language: 'English' });

    expect(answer.source).toBe('local');
    expect(answer.text).toMatch(/Bay 207/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns intelligent fallback when the key is missing', async () => {
    import.meta.env.VITE_GEMINI_API_KEY = '';

    const answer = await askArenaMind({
      prompt: 'Generate a staffing plan for the next hour using all current venue signals.',
      role: 'organizer',
      language: 'English'
    });

    expect(answer.source).toBe('fallback');
    expect(answer.error).toMatch(/not configured/i);
  });

  it('returns Gemini text for complex prompts when configured', async () => {
    import.meta.env.VITE_GEMINI_API_KEY = 'test-key';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: 'Open Gate C and move two volunteers to Gate D.' }] } }]
        })
      })
    );

    const answer = await askArenaMind({
      prompt: 'Generate a staffing plan for the next hour using all current venue signals.',
      role: 'organizer',
      language: 'English'
    });

    expect(answer.source).toBe('gemini');
    expect(answer.text).toMatch(/Open Gate C/i);
  });

  it('falls back when Gemini fails', async () => {
    import.meta.env.VITE_GEMINI_API_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const answer = await askArenaMind({
      prompt: 'Generate a staffing plan for the next hour using all current venue signals.',
      role: 'organizer',
      language: 'English'
    });

    expect(answer.source).toBe('fallback');
    expect(answer.error).toMatch(/500/);
  });
});
