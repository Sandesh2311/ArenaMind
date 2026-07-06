import PropTypes from 'prop-types';
import { memo } from 'react';
import { fanTools, matchSchedule, routeCards } from '../../data/stadiumData.js';
import { AIAssistant } from '../AIAssistant.jsx';

function FanDashboardComponent({ language, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <AIAssistant role="fan" language={language} onLanguageChange={onLanguageChange} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass rounded-lg p-5" aria-labelledby="fan-tools-title">
          <h3 id="fan-tools-title" className="text-2xl font-bold text-white">
            Fan service finder
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {fanTools.map((tool) => (
              <article key={tool.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <tool.icon className="text-arena-cyan" size={24} aria-hidden="true" />
                <h4 className="mt-3 font-bold text-white">{tool.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{tool.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-lg p-5" aria-labelledby="match-title">
          <h3 id="match-title" className="text-2xl font-bold text-white">
            Live match schedule
          </h3>
          <div className="mt-5 space-y-3">
            {matchSchedule.map((item) => (
              <article key={item.time} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-bold text-white">{item.fixture}</p>
                  <p className="text-sm text-slate-400">{item.status}</p>
                </div>
                <time className="font-mono text-arena-gold">{item.time}</time>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="glass rounded-lg p-5" aria-labelledby="routes-title">
        <h3 id="routes-title" className="text-2xl font-bold text-white">
          Indoor navigation route cards
        </h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {routeCards.map((route) => (
            <article key={`${route.from}-${route.to}`} className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-bold text-white">
                  {route.from} to {route.to}
                </h4>
                <span className="rounded-md bg-arena-mint/15 px-3 py-1 text-sm font-semibold text-arena-mint">{route.duration}</span>
              </div>
              <ol className="mt-4 space-y-3">
                {route.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-slate-300">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-white/10 text-xs text-arena-cyan">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

FanDashboardComponent.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export const FanDashboard = memo(FanDashboardComponent);
