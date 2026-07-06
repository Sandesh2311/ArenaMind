import { useCallback, useRef, useState } from 'react';
import { ASSISTANT_FALLBACK_MESSAGE, STARTER_MESSAGES } from '../constants/assistant.js';
import { validatePrompt } from '../utils/validation.js';

/**
 * Manage assistant conversation state and lazy-load the AI service only when a prompt is submitted.
 * @param {'fan'|'organizer'|'volunteer'} role Active user role.
 * @param {string} language Active response language.
 * @returns {{messages: Array, isLoading: boolean, ask: Function}}
 */
export function useArenaAssistant(role, language) {
  const [messages, setMessages] = useState([
    { id: 'welcome', from: 'ai', text: STARTER_MESSAGES[role], source: 'local' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const pendingRequestRef = useRef(false);

  const ask = useCallback(
    async (prompt) => {
      const validation = validatePrompt(prompt);
      if (!validation.ok) {
        const answer = { text: validation.error, source: 'fallback' };
        setMessages((current) => [...current, { id: crypto.randomUUID(), from: 'ai', ...answer }]);
        return answer;
      }

      if (pendingRequestRef.current) {
        return { text: 'ArenaMind is already processing a request.', source: 'fallback' };
      }

      const userMessage = { id: crypto.randomUUID(), from: 'user', text: validation.value };
      setMessages((current) => [...current, userMessage]);
      setIsLoading(true);
      pendingRequestRef.current = true;

      try {
        const { askArenaMind } = await import('../services/geminiService.js');
        const answer = await askArenaMind({ prompt: validation.value, role, language });
        setMessages((current) => [
          ...current,
          { id: crypto.randomUUID(), from: 'ai', text: answer.text, source: answer.source }
        ]);
        return answer;
      } catch {
        const answer = { text: ASSISTANT_FALLBACK_MESSAGE, source: 'fallback' };
        setMessages((current) => [...current, { id: crypto.randomUUID(), from: 'ai', ...answer }]);
        return answer;
      } finally {
        setIsLoading(false);
        pendingRequestRef.current = false;
      }
    },
    [language, role]
  );

  return { messages, isLoading, ask };
}
