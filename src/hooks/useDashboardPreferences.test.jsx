import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDashboardPreferences } from './useDashboardPreferences.js';

describe('useDashboardPreferences', () => {
  it('starts with safe defaults and accepts supported preferences', () => {
    const { result } = renderHook(() => useDashboardPreferences());

    expect(result.current.activeRole).toBe('fan');
    expect(result.current.language).toBe('English');

    act(() => {
      result.current.handleRoleChange('organizer');
      result.current.handleLanguageChange('Spanish');
    });

    expect(result.current.activeRole).toBe('organizer');
    expect(result.current.language).toBe('Spanish');
  });

  it('falls back when unsupported role or language values are provided', () => {
    const { result } = renderHook(() => useDashboardPreferences());

    act(() => {
      result.current.handleRoleChange('admin');
      result.current.handleLanguageChange('Klingon');
    });

    expect(result.current.activeRole).toBe('fan');
    expect(result.current.language).toBe('English');
  });
});
