import { useCallback, useState } from 'react';
import { askArenaMind } from '../services/geminiService.js';

const starterMessages = {
  fan: 'Ask me about gates, seats, parking, food, washrooms, exits, or translation.',
  organizer: 'Ask for queue mitigation, incident triage, resource allocation, or emergency recommendations.',
  volunteer: 'Ask for task guidance, translation help, navigation, or escalation wording.'
};

export function useArenaAssistant(role, language) {
  const [messages, setMessages] = useState([
    { id: 'welcome', from: 'ai', text: starterMessages[role], source: 'local' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const ask = useCallback(
    async (prompt) => {
      const userMessage = { id: crypto.randomUUID(), from: 'user', text: prompt };
      setMessages((current) => [...current, userMessage]);
      setIsLoading(true);

      const answer = await askArenaMind({ prompt, role, language });
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), from: 'ai', text: answer.text, source: answer.source }
      ]);
      setIsLoading(false);
      return answer;
    },
    [language, role]
  );

  return { messages, isLoading, ask };
}
