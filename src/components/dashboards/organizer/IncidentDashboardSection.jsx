import { memo } from 'react';
import { incidents } from '../../../data/organizerAnalyticsData.js';

function IncidentDashboardSectionComponent() {
  const highSeverityCount = incidents.filter((incident) => incident.severity === 'High').length;
  const summary = `${incidents.length} active incidents. ${highSeverityCount} high severity incident. Areas include ${incidents.map((incident) => incident.area).join(', ')}.`;

  return (
    <section className="glass rounded-lg p-5 xl:col-span-2" aria-labelledby="incident-title" aria-describedby="incident-summary">
      <h3 id="incident-title" className="text-2xl font-bold text-white">
        Incident dashboard
      </h3>
      <p id="incident-summary" className="sr-only">
        {summary}
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{summary}</caption>
          <thead className="text-slate-400">
            <tr>
              <th scope="col" className="py-3">ID</th>
              <th scope="col">Area</th>
              <th scope="col">Severity</th>
              <th scope="col">Summary</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {incidents.map((incident) => (
              <tr key={incident.id} className="text-slate-200">
                <th scope="row" className="py-3 font-mono font-normal text-arena-cyan">{incident.id}</th>
                <td>{incident.area}</td>
                <td>{incident.severity}</td>
                <td>{incident.summary}</td>
                <td>{incident.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export const IncidentDashboardSection = memo(IncidentDashboardSectionComponent);
