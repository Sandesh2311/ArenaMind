import { memo } from 'react';
import { incidents } from '../../../data/organizerAnalyticsData.js';

function IncidentDashboardSectionComponent() {
  return (
    <section className="glass rounded-lg p-5 xl:col-span-2" aria-labelledby="incident-title">
      <h3 id="incident-title" className="text-2xl font-bold text-white">
        Incident dashboard
      </h3>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="py-3">ID</th>
              <th>Area</th>
              <th>Severity</th>
              <th>Summary</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {incidents.map((incident) => (
              <tr key={incident.id} className="text-slate-200">
                <td className="py-3 font-mono text-arena-cyan">{incident.id}</td>
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
