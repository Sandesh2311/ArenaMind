import { memo, useMemo } from 'react';
import { AreaChart } from 'recharts/es6/chart/AreaChart';
import { Area } from 'recharts/es6/cartesian/Area';
import { CartesianGrid } from 'recharts/es6/cartesian/CartesianGrid';
import { XAxis } from 'recharts/es6/cartesian/XAxis';
import { YAxis } from 'recharts/es6/cartesian/YAxis';
import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer';
import { Tooltip } from 'recharts/es6/component/Tooltip';
import { queueAnalytics } from '../../../data/organizerAnalyticsData.js';

const tooltipStyle = Object.freeze({
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff'
});

function QueueAnalyticsSectionComponent() {
  const queueChartData = useMemo(() => queueAnalytics, []);

  return (
    <section className="glass rounded-lg p-5" aria-labelledby="queue-title">
      <h3 id="queue-title" className="text-2xl font-bold text-white">
        Queue analytics
      </h3>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={queueChartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="GateA" stroke="#35d6ff" fill="#35d6ff33" />
            <Area type="monotone" dataKey="GateB" stroke="#facc15" fill="#facc1533" />
            <Area type="monotone" dataKey="GateD" stroke="#fb7185" fill="#fb718533" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export const QueueAnalyticsSection = memo(QueueAnalyticsSectionComponent);
