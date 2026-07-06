import { memo } from 'react';
import { alerts } from '../../../data/organizerAnalyticsData.js';

const alertClassName = Object.freeze({
  coral: 'text-arena-coral',
  cyan: 'text-arena-cyan',
  mint: 'text-arena-mint'
});

function LiveAlertsSectionComponent() {
  return (
    <section className="glass rounded-lg p-5" aria-labelledby="alerts-title" aria-describedby="alerts-summary">
      <h3 id="alerts-title" className="text-2xl font-bold text-white">
        Live alerts
      </h3>
      <p id="alerts-summary" className="sr-only">
        {alerts.length} live operational alerts are available. Alerts are listed by current priority and include recommended action text.
      </p>
      <div className="mt-5 space-y-3">
        {alerts.map((alert) => (
          <article key={alert.text} className="rounded-lg border border-white/10 bg-white/5 p-4" role="status">
            <alert.icon className={alertClassName[alert.tone]} size={22} aria-hidden="true" />
            <p className="mt-3 text-sm leading-6 text-slate-200">{alert.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export const LiveAlertsSection = memo(LiveAlertsSectionComponent);
