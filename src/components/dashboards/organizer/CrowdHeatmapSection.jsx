import { memo } from 'react';
import { crowdZones } from '../../../data/organizerAnalyticsData.js';

const riskClassName = Object.freeze({
  High: 'text-arena-coral',
  Monitor: 'text-arena-gold',
  Stable: 'text-arena-mint'
});

function CrowdHeatmapSectionComponent() {
  return (
    <section className="glass rounded-lg p-5" aria-labelledby="heatmap-title">
      <h3 id="heatmap-title" className="text-2xl font-bold text-white">
        Crowd heatmap
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {crowdZones.map((zone) => (
          <article key={zone.zone} className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white">{zone.zone}</h4>
              <span className={riskClassName[zone.risk]}>{zone.risk}</span>
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
  );
}

export const CrowdHeatmapSection = memo(CrowdHeatmapSectionComponent);
