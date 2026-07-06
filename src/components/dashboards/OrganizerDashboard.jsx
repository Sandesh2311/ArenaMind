import PropTypes from 'prop-types';
import { memo } from 'react';
import {
  emergencyActions,
  genAiArchitectureNotes,
  nextBestActions,
  operationalInsights,
  stats,
  tournamentOperationsOverview
} from '../../data/organizerCoreData.js';
import { AIAssistant } from '../AIAssistant.jsx';
import { MetricCard } from '../ui/MetricCard.jsx';
import { CrowdHeatmapSection } from './organizer/CrowdHeatmapSection.jsx';
import { IncidentDashboardSection } from './organizer/IncidentDashboardSection.jsx';
import { LiveAlertsSection } from './organizer/LiveAlertsSection.jsx';
import { QueueAnalyticsSection } from './organizer/QueueAnalyticsSection.jsx';
import { VolunteerMonitoringSection } from './organizer/VolunteerMonitoringSection.jsx';

/**
 * Render organizer command-center modules while delegating analytics sections to focused children.
 * @param {{language: string, onLanguageChange: Function}} props Dashboard props.
 * @returns {JSX.Element}
 */
function OrganizerDashboardComponent({ language, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </div>

      <section className="glass rounded-lg p-5" aria-labelledby="tournament-operations-title">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-arena-cyan">Organizers</p>
            <h3 id="tournament-operations-title" className="mt-2 text-2xl font-bold text-white">
              Tournament Operations Overview
            </h3>
          </div>
          <span className="rounded-md bg-arena-mint/15 px-3 py-1 text-sm font-semibold text-arena-mint">
            Real-time decision support
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {tournamentOperationsOverview.map((item) => (
            <article key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">{item.label}</p>
              <strong className="mt-2 block text-2xl text-white">{item.value}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {nextBestActions.map((card) => (
            <article key={card.title} className="rounded-lg border border-arena-cyan/25 bg-slate-950/50 p-4">
              <p className="text-xs font-semibold uppercase text-arena-gold">AI Next Best Action</p>
              <h4 className="mt-3 font-bold text-white">{card.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.context}</p>
              <p className="mt-3 text-sm font-semibold text-arena-cyan">{card.action}</p>
              <p className="mt-2 text-sm text-slate-400">{card.impact}</p>
            </article>
          ))}
        </div>
      </section>

      <AIAssistant role="organizer" language={language} onLanguageChange={onLanguageChange} />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="glass rounded-lg p-5" aria-labelledby="operational-insights-title">
          <h3 id="operational-insights-title" className="text-2xl font-bold text-white">
            Operational Insights
          </h3>
          <div className="mt-5 space-y-3">
            {operationalInsights.map((insight) => (
              <article key={insight} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
                {insight}
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-lg p-5" aria-labelledby="genai-architecture-title">
          <h3 id="genai-architecture-title" className="text-2xl font-bold text-white">
            GenAI architecture status
          </h3>
          <div className="mt-5 space-y-3">
            {genAiArchitectureNotes.map((note) => (
              <article key={note.label} className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
                <h4 className="font-bold text-white">{note.label}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{note.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <CrowdHeatmapSection />
        <QueueAnalyticsSection />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <IncidentDashboardSection />
        <LiveAlertsSection />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <VolunteerMonitoringSection />
        <section className="glass rounded-lg p-5" aria-labelledby="emergency-title">
          <h3 id="emergency-title" className="text-2xl font-bold text-white">
            Emergency control panel
          </h3>
          <div className="mt-5 grid gap-3">
            {emergencyActions.map((action) => (
              <button
                key={action}
                type="button"
                className="min-h-12 rounded-md border border-white/10 bg-white/5 px-4 text-left font-semibold text-slate-100 transition hover:border-arena-cyan hover:bg-arena-cyan/10"
              >
                {action}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

OrganizerDashboardComponent.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export const OrganizerDashboard = memo(OrganizerDashboardComponent);
