import PropTypes from 'prop-types';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { alerts, crowdZones, incidents, queueAnalytics, stats, volunteers } from '../../data/stadiumData.js';
import { AIAssistant } from '../AIAssistant.jsx';
import { MetricCard } from '../ui/MetricCard.jsx';

const riskClassName = {
  High: 'text-arena-coral',
  Monitor: 'text-arena-gold',
  Stable: 'text-arena-mint'
};

const alertClassName = {
  coral: 'text-arena-coral',
  cyan: 'text-arena-cyan',
  mint: 'text-arena-mint'
};

export function OrganizerDashboard({ language, onLanguageChange }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </div>

      <AIAssistant role="organizer" language={language} onLanguageChange={onLanguageChange} />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="glass rounded-lg p-5" aria-labelledby="heatmap-title">
          <h3 id="heatmap-title" className="text-2xl font-bold text-white">
            Crowd heatmap
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {crowdZones.map((zone) => (
              <article key={zone.zone} className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{zone.zone}</h4>
                  <span className={riskClassName[zone.risk]}>
                    {zone.risk}
                  </span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded bg-white/10">
                  <div className="h-full rounded bg-arena-cyan" style={{ width: `${zone.density}%` }} aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  {zone.density}% density, {zone.wait} min queue
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-lg p-5" aria-labelledby="queue-title">
          <h3 id="queue-title" className="text-2xl font-bold text-white">
            Queue analytics
          </h3>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={queueAnalytics}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }} />
                <Area type="monotone" dataKey="GateA" stroke="#35d6ff" fill="#35d6ff33" />
                <Area type="monotone" dataKey="GateB" stroke="#facc15" fill="#facc1533" />
                <Area type="monotone" dataKey="GateD" stroke="#fb7185" fill="#fb718533" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
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

        <section className="glass rounded-lg p-5" aria-labelledby="alerts-title">
          <h3 id="alerts-title" className="text-2xl font-bold text-white">
            Live alerts
          </h3>
          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <article key={alert.text} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <alert.icon className={alertClassName[alert.tone]} size={22} aria-hidden="true" />
                <p className="mt-3 text-sm leading-6 text-slate-200">{alert.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass rounded-lg p-5" aria-labelledby="volunteer-monitor-title">
          <h3 id="volunteer-monitor-title" className="text-2xl font-bold text-white">
            Volunteer monitoring
          </h3>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volunteers}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.14)', color: '#fff' }} />
                <Bar dataKey={(item) => Number.parseInt(item.response, 10)} name="Response minutes" fill="#4ade80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass rounded-lg p-5" aria-labelledby="emergency-title">
          <h3 id="emergency-title" className="text-2xl font-bold text-white">
            Emergency control panel
          </h3>
          <div className="mt-5 grid gap-3">
            {['Open Gate D2 overflow lane', 'Dispatch Medic 2 to Bay 112', 'Broadcast multilingual crowd advisory', 'Lock vehicle ingress at Lot P1'].map(
              (action) => (
                <button
                  key={action}
                  type="button"
                  className="min-h-12 rounded-md border border-white/10 bg-white/5 px-4 text-left font-semibold text-slate-100 transition hover:border-arena-cyan hover:bg-arena-cyan/10"
                >
                  {action}
                </button>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

OrganizerDashboard.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};
