import '@testing-library/jest-dom/vitest';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => `test-${Math.random().toString(16).slice(2)}`
  }
});
