import PropTypes from 'prop-types';
import { lazy, memo, Suspense } from 'react';

const AIAssistant = lazy(() =>
  import('./AIAssistant.jsx').then((module) => ({ default: module.AIAssistant }))
);

function LazyAIAssistantComponent({ role, language, onLanguageChange }) {
  return (
    <Suspense
      fallback={
        <section className="glass rounded-lg p-5" aria-label="AI Stadium Assistant">
          <p className="text-sm text-slate-300">Loading assistant...</p>
        </section>
      }
    >
      <AIAssistant role={role} language={language} onLanguageChange={onLanguageChange} />
    </Suspense>
  );
}

LazyAIAssistantComponent.propTypes = {
  role: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export const LazyAIAssistant = memo(LazyAIAssistantComponent);
