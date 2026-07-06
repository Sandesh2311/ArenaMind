import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useArenaAssistant } from './useArenaAssistant.js';

const originalKey = import.meta.env.VITE_GEMINI_API_KEY;

describe('useArenaAssistant', () => {
  afterEach(() => {
    import.meta.env.VITE_GEMINI_API_KEY = originalKey;
    vi.doUnmock('../services/geminiService.js');
    vi.resetModules();
  });

  it('starts with the role-specific assistant message', () => {
    const { result } = renderHook(() => useArenaAssistant('volunteer', 'English'));

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]).toMatchObject({
      from: 'ai',
      source: 'local',
      text: expect.stringMatching(/task guidance/i)
    });
  });

  it('adds validation failures as assistant messages without loading', async () => {
    const { result } = renderHook(() => useArenaAssistant('fan', 'English'));

    let answer;
    await act(async () => {
      answer = await result.current.ask(' ');
    });

    expect(answer.source).toBe('fallback');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.messages.at(-1).text).toMatch(/Enter a stadium question first/i);
  });

  it('adds user and AI messages for local answers', async () => {
    const { result } = renderHook(() => useArenaAssistant('fan', 'English'));

    await act(async () => {
      await result.current.ask('Where is Gate B?');
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: 'user', text: 'Where is Gate B?' }),
        expect.objectContaining({ from: 'ai', source: 'local', text: expect.stringMatching(/east arrival plaza/i) })
      ])
    );
  });

  it('returns role-aware fallback messages when the remote service is unavailable', async () => {
    import.meta.env.VITE_GEMINI_API_KEY = '';
    const { result } = renderHook(() => useArenaAssistant('organizer', 'English'));

    let answer;
    await act(async () => {
      answer = await result.current.ask('Create a detailed ingress mitigation plan for the next hour.');
    });

    expect(answer.source).toBe('fallback');
    expect(result.current.messages.at(-1)).toMatchObject({
      from: 'ai',
      source: 'fallback',
      text: expect.stringMatching(/Operational summary/i)
    });
  });

  it('uses the assistant unavailable message when the AI service cannot load', async () => {
    vi.resetModules();
    vi.doMock('../services/geminiService.js', () => {
      throw new Error('module load failed');
    });
    const { useArenaAssistant: useIsolatedAssistant } = await import('./useArenaAssistant.js');
    const { result } = renderHook(() => useIsolatedAssistant('fan', 'English'));

    let answer;
    await act(async () => {
      answer = await result.current.ask('Create a detailed ingress mitigation plan for the next hour.');
    });

    expect(answer.source).toBe('fallback');
    expect(answer.text).toMatch(/temporarily unavailable/i);
    expect(result.current.messages.at(-1).text).toMatch(/temporarily unavailable/i);
  });

  it('coalesces overlapping submissions while a request is already in flight', async () => {
    const askArenaMind = vi.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
      return { text: 'resolved', source: 'gemini' };
    });

    vi.resetModules();
    vi.doMock('../services/geminiService.js', () => ({ askArenaMind }));
    const { useArenaAssistant: useIsolatedAssistant } = await import('./useArenaAssistant.js');
    const { result } = renderHook(() => useIsolatedAssistant('fan', 'English'));

    await act(async () => {
      await Promise.all([result.current.ask('Where is Gate B?'), result.current.ask('Where are the bathrooms?')]);
    });

    expect(askArenaMind).toHaveBeenCalledTimes(1);
  });
});
