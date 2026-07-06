import { describe, expect, it } from 'vitest';
import { validatePrompt } from './validation.js';

describe('validatePrompt', () => {
  it('rejects blank prompts', () => {
    expect(validatePrompt('   ').ok).toBe(false);
  });

  it('normalizes whitespace', () => {
    expect(validatePrompt(' nearest   washroom ').value).toBe('nearest washroom');
  });

  it('rejects overly long prompts', () => {
    expect(validatePrompt('a'.repeat(601)).ok).toBe(false);
  });
});
