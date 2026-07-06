import { crowdZones, incidents, queueAnalytics, volunteers } from './organizerAnalyticsData.js';

export const stats = Object.freeze([
  { label: 'Live Visitors', value: '73,420', trend: '+8.4%', tone: 'cyan' },
  { label: 'Avg Queue Time', value: '7.8 min', trend: '-3.1 min', tone: 'mint' },
  { label: 'Volunteer SLA', value: '96%', trend: '+5%', tone: 'gold' },
  { label: 'Fan Satisfaction', value: '4.8/5', trend: '+0.4', tone: 'coral' }
]);

export const emergencyActions = Object.freeze([
  'Open Gate D2 overflow lane',
  'Dispatch Medic 2 to Bay 112',
  'Broadcast multilingual crowd advisory',
  'Lock vehicle ingress at Lot P1'
]);

const latestQueueSnapshot = queueAnalytics.at(-1);
const highDensityZones = crowdZones.filter((zone) => zone.density >= 80);
const availableVolunteers = volunteers.filter((volunteer) => volunteer.status === 'Available');
const longestQueue = Object.entries(latestQueueSnapshot)
  .filter(([key]) => key !== 'name')
  .sort(([, waitA], [, waitB]) => waitB - waitA)
  .at(0);

export const tournamentOperationsOverview = Object.freeze([
  {
    label: 'Active incidents',
    value: `${incidents.length}`,
    detail: `${incidents.filter((incident) => incident.severity === 'High').length} high severity at ${incidents[0].area}`
  },
  {
    label: 'Crowd density summary',
    value: `${highDensityZones.length} hot zones`,
    detail: `${highDensityZones.map((zone) => zone.zone).join(', ')} need active monitoring`
  },
  {
    label: 'Volunteer availability',
    value: `${availableVolunteers.length}/${volunteers.length} available`,
    detail: `${availableVolunteers.map((volunteer) => volunteer.name).join(' and ')} can be reassigned now`
  },
  {
    label: 'Queue status',
    value: `${longestQueue[1]} min`,
    detail: `${longestQueue[0].replace('Gate', 'Gate ')} has the longest current wait`
  }
]);

export const nextBestActions = Object.freeze([
  {
    title: 'Open Gate C overflow routing',
    context: 'Gate D density is 91% with a 21 minute peak queue.',
    action: 'Open Gate C as the preferred alternate and push signage from Gate D.',
    impact: 'Expected to reduce Gate D pressure within 10 minutes.'
  },
  {
    title: 'Redirect visitors to Food Court B',
    context: 'North Concourse is at monitor risk before halftime concessions.',
    action: 'Send fans near Bay 208 toward Food Court B and South Market.',
    impact: 'Balances footfall before the halftime demand spike.'
  },
  {
    title: 'Dispatch volunteers to Section D',
    context: 'Queue compression and medical access both affect the Gate D side.',
    action: 'Move two available volunteers to Section D aisle control and family guidance.',
    impact: 'Keeps emergency lanes clear while improving visitor flow.'
  }
]);

export const operationalInsights = Object.freeze([
  'Local AI flags Gate D as the highest operational risk because crowd density, queue time, and incident severity converge there.',
  'Tournament operations should keep Medical Point M2 access clear while volunteers guide fans away from Bay 112.',
  'Fan-facing guidance should recommend Gate C, North Market only for short visits, and alternate indoor routes before kickoff.'
]);

export const tournamentSupportModules = Object.freeze([
  { label: 'Multi Stadium Status', value: '3/4 ready', detail: 'Main Bowl, Fan Zone, and Transit Hub are operational.' },
  { label: 'Tournament Operations Center', value: 'Priority 1', detail: 'Crowd balancing and incident containment remain the top focus.' },
  { label: 'Team Arrival Status', value: 'On time', detail: 'Arrival windows remain aligned with the match-day schedule.' },
  { label: 'Shuttle Coordination', value: 'Stable', detail: 'Shuttle loops are maintaining expected transfer times.' },
  { label: 'Emergency Coordination', value: 'Active', detail: 'Medical and crowd-control teams remain synchronized.' },
  { label: 'Accessibility Assistance', value: 'Ready', detail: 'Queues and wayfinding support are available across key concourses.' }
]);

export const genAiArchitectureNotes = Object.freeze([
  {
    label: 'Local AI',
    detail: 'Used for common stadium FAQs, deterministic route guidance, queue recommendations, and offline operational cards.'
  },
  {
    label: 'Gemini',
    detail: 'Used only for complex multilingual reasoning when VITE_GEMINI_API_KEY is configured and local rules do not answer.'
  },
  {
    label: 'Fallback behavior',
    detail: 'If Gemini is unavailable, the app returns role-aware local guidance from the same simulated venue state.'
  }
]);
