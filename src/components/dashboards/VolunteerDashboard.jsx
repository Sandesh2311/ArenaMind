import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Navigation from 'lucide-react/dist/esm/icons/navigation';
import Radio from 'lucide-react/dist/esm/icons/radio';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { routeCards, volunteerTasks } from '../../data/stadiumData.js';
import { AIAssistant } from '../AIAssistant.jsx';

const quickHelp = Object.freeze([
  { icon: ShieldAlert, label: 'Escalate emergency', detail: 'Send location, severity, and crowd condition to command.' },
  { icon: MessageSquare, label: 'Translation assistant', detail: 'Convert fan guidance into English, Hindi, Spanish, French, Portuguese, or Arabic.' },
  { icon: Navigation, label: 'Navigation', detail: 'Find fastest staff route to gate, bay, medical point, or lost and found.' },
  { icon: Radio, label: 'Communication panel', detail: 'Broadcast concise status updates to team channel.' }
]);

function VolunteerDashboardComponent({ language, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <AIAssistant role="volunteer" language={language} onLanguageChange={onLanguageChange} />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass rounded-lg p-5" aria-labelledby="tasks-title">
          <h3 id="tasks-title" className="text-2xl font-bold text-white">
            Assigned tasks
          </h3>
          <div className="mt-5 space-y-3">
            {volunteerTasks.map((task) => (
              <article key={task.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
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
          <div className="mt-5 grid gap-3">
            {quickHelp.map((item) => (
              <article key={item.label} className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
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
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {routeCards.map((route) => (
            <article key={`${route.from}-${route.to}`} className="rounded-lg border border-white/10 bg-white/5 p-4">
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
