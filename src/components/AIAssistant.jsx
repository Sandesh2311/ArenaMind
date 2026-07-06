import Send from 'lucide-react/dist/esm/icons/send';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';
import { LANGUAGES } from '../constants/app.js';
import { useArenaAssistant } from '../hooks/useArenaAssistant.js';

const examples = Object.freeze([
  'Where is Gate B?',
  'Find my seat',
  'Nearest washroom',
  'Translate to Spanish',
  'What is the waiting time?',
  'Emergency near Gate D'
]);

function AIAssistantComponent({ role, language, onLanguageChange }) {
  const [prompt, setPrompt] = useState('');
  const { messages, isLoading, ask } = useArenaAssistant(role, language);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      const current = prompt;
      setPrompt('');
      await ask(current);
    },
    [ask, prompt]
  );

  const handleLanguageChange = useCallback(
    (event) => {
      onLanguageChange(event.target.value);
    },
    [onLanguageChange]
  );

  return (
    <section className="glass rounded-lg p-5" aria-label="AI Stadium Assistant">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-arena-cyan">
            <Sparkles size={16} aria-hidden="true" /> AI Stadium Assistant
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white">Hybrid Gemini and offline venue intelligence</h3>
        </div>
        <label className="text-sm text-slate-300">
          <span className="mb-2 block">Language</span>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="min-h-11 rounded-md border border-white/15 bg-slate-950/80 px-3 text-white"
            aria-label="Assistant language"
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 max-h-72 space-y-3 overflow-y-auto rounded-lg border border-white/10 bg-slate-950/40 p-3" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                message.from === 'user' ? 'bg-arena-cyan text-slate-950' : 'bg-white/10 text-slate-100'
              }`}
            >
              <p>{message.text}</p>
              {message.source && <span className="mt-2 block text-xs opacity-70">Source: {message.source}</span>}
            </div>
          </div>
        ))}
        {isLoading && <p className="text-sm text-slate-300">ArenaMind is analyzing venue context...</p>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setPrompt(example)}
            className="rounded-md border border-white/10 px-3 py-2 text-xs text-slate-200 transition hover:border-arena-cyan hover:text-white"
          >
            {example}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <label className="sr-only" htmlFor={`${role}-assistant-prompt`}>
          Ask ArenaMind
        </label>
        <input
          id={`${role}-assistant-prompt`}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="min-h-12 flex-1 rounded-md border border-white/15 bg-slate-950/70 px-4 text-white placeholder:text-slate-500"
          placeholder="Ask about routes, queues, incidents, translation..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-12 items-center gap-2 rounded-md bg-arena-cyan px-4 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} aria-hidden="true" />
          <span>Send</span>
        </button>
      </form>
    </section>
  );
}

AIAssistantComponent.propTypes = {
  role: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export const AIAssistant = memo(AIAssistantComponent);
