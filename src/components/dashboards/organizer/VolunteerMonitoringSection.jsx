import { memo, useMemo } from 'react';
import { BarChart } from 'recharts/es6/chart/BarChart';
import { Bar } from 'recharts/es6/cartesian/Bar';
import { CartesianGrid } from 'recharts/es6/cartesian/CartesianGrid';
import { XAxis } from 'recharts/es6/cartesian/XAxis';
import { YAxis } from 'recharts/es6/cartesian/YAxis';
import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer';
import { Tooltip } from 'recharts/es6/component/Tooltip';
import { volunteers } from '../../../data/organizerAnalyticsData.js';

const tooltipStyle = Object.freeze({
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff'
});

const barRadius = Object.freeze([6, 6, 0, 0]);

function VolunteerMonitoringSectionComponent() {
  const volunteerResponseData = useMemo(
    () =>
      volunteers.map((volunteer) => ({
        ...volunteer,
        responseMinutes: Number.parseInt(volunteer.response, 10)
      })),
    []
  );
  const volunteerSummary = useMemo(() => {
    const fastest = [...volunteerResponseData].sort((a, b) => a.responseMinutes - b.responseMinutes).at(0);
    const statuses = volunteerResponseData.map(
      (volunteer) => `${volunteer.name} in ${volunteer.zone}, ${volunteer.status}, ${volunteer.responseMinutes} minute response`
    );

    return `Volunteer monitoring chart for ${volunteerResponseData.length} volunteers. Fastest response is ${fastest.name} at ${fastest.responseMinutes} minute. Current statuses: ${statuses.join('; ')}.`;
  }, [volunteerResponseData]);

  return (
    <section
      className="glass rounded-lg p-5"
      aria-labelledby="volunteer-monitor-title"
      aria-describedby="volunteer-monitor-summary"
    >
      <h3 id="volunteer-monitor-title" className="text-2xl font-bold text-white">
        Volunteer monitoring
      </h3>
      <p id="volunteer-monitor-summary" className="sr-only">
        {volunteerSummary}
      </p>
      <div className="mt-5 h-72" role="img" aria-label={volunteerSummary}>
        <div className="h-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volunteerResponseData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="responseMinutes" name="Response minutes" fill="#4ade80" radius={barRadius} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export const VolunteerMonitoringSection = memo(VolunteerMonitoringSectionComponent);
