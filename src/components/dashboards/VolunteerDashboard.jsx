import PropTypes from 'prop-types';
import { memo } from 'react';
import { quickHelp, routeCards, volunteerAiGuidance, volunteerTasks } from '../../data/volunteerData.js';
import { AIAssistant } from '../AIAssistant.jsx';

/**
 * Render volunteer tasks, quick help, navigation, and communication workflows.
 * @param {{language: string, onLanguageChange: Function}} props Dashboard props.
 * @returns {JSX.Element}
 */
function VolunteerDashboardComponent({ language, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <AIAssistant role="volunteer" language={language} onLanguageChange={onLanguageChange} />

      <section className="glass rounded-lg p-5" aria-labelledby="volunteer-ai-guidance-title">
        <h3 id="volunteer-ai-guidance-title" className="text-2xl font-bold text-white">
          Volunteer AI task guidance
        </h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <article className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h4 className="font-bold text-white">AI task prioritization</h4>
            <ul className="mt-3 space-y-2">
              {volunteerAiGuidance.priorities.map((tip) => (
                <li key={tip} className="text-sm leading-6 text-slate-300">
                  {tip}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h4 className="font-bold text-white">Emergency routing</h4>
            <ul className="mt-3 space-y-2">
              {volunteerAiGuidance.emergencyRouting.map((tip) => (
                <li key={tip} className="text-sm leading-6 text-slate-300">
                  {tip}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h4 className="font-bold text-white">Language assistance suggestions</h4>
            <ul className="mt-3 space-y-2">
              {volunteerAiGuidance.languageAssistance.map((tip) => (
                <li key={tip} className="text-sm leading-6 text-slate-300">
                  {tip}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass rounded-lg p-5" aria-labelledby="tasks-title">
          <h3 id="tasks-title" className="text-2xl font-bold text-white">
            Assigned tasks
          </h3>
          <p id="tasks-summary" className="sr-only">
            Assigned volunteer tasks include task title, priority, and due time.
          </p>
          <div className="mt-5 space-y-3" role="list" aria-describedby="tasks-summary">
            {volunteerTasks.map((task) => (
              <article
                key={task.title}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
                role="listitem"
                aria-label={`${task.title}. Priority: ${task.priority}. Due: ${task.due}.`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="font-bold text-white">{task.title}</h4>
                  <span className="rounded-md bg-arena-cyan/15 px-3 py-1 text-sm font-semibold text-arena-cyan">{task.due}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">Priority: {task.priority}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-lg p-5" aria-labelledby="quick-help-title">
          <h3 id="quick-help-title" className="text-2xl font-bold text-white">
            Quick AI help
          </h3>
          <div className="mt-5 grid gap-3" role="list" aria-label="Quick AI help actions">
            {quickHelp.map((item) => (
              <article
                key={item.label}
                className="rounded-lg border border-white/10 bg-slate-950/50 p-4"
                role="listitem"
                aria-label={`${item.label}: ${item.detail}`}
              >
                <item.icon className="text-arena-gold" size={24} aria-hidden="true" />
                <h4 className="mt-3 font-bold text-white">{item.label}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="glass rounded-lg p-5" aria-labelledby="volunteer-navigation-title">
        <h3 id="volunteer-navigation-title" className="text-2xl font-bold text-white">
          Staff navigation and emergency routes
        </h3>
        <p id="volunteer-navigation-summary" className="sr-only">
          Staff route cards list origin, destination, duration, and emergency wayfinding instructions.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3" role="list" aria-describedby="volunteer-navigation-summary">
          {routeCards.map((route) => (
            <article
              key={`${route.from}-${route.to}`}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
              role="listitem"
              aria-label={`Staff route from ${route.from} to ${route.to}. Estimated duration ${route.duration}. Steps: ${route.steps.join(', ')}.`}
            >
              <p className="font-bold text-white">
                {route.from} to {route.to}
              </p>
              <p className="mt-1 text-sm text-arena-mint">{route.duration}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{route.steps.join(' -> ')}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

VolunteerDashboardComponent.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export const VolunteerDashboard = memo(VolunteerDashboardComponent);
