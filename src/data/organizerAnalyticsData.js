import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import Radio from 'lucide-react/dist/esm/icons/radio';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';

export const crowdZones = Object.freeze([
  { zone: 'Gate A', density: 58, wait: 8, risk: 'Stable' },
  { zone: 'Gate B', density: 82, wait: 16, risk: 'Monitor' },
  { zone: 'Gate C', density: 44, wait: 5, risk: 'Stable' },
  { zone: 'Gate D', density: 91, wait: 21, risk: 'High' },
  { zone: 'North Concourse', density: 76, wait: 13, risk: 'Monitor' },
  { zone: 'South Market', density: 63, wait: 11, risk: 'Stable' }
]);

export const queueAnalytics = Object.freeze([
  { name: '16:00', GateA: 6, GateB: 9, GateD: 13 },
  { name: '16:30', GateA: 7, GateB: 12, GateD: 17 },
  { name: '17:00', GateA: 8, GateB: 16, GateD: 21 },
  { name: '17:30', GateA: 7, GateB: 14, GateD: 18 },
  { name: '18:00', GateA: 5, GateB: 11, GateD: 15 }
]);

export const incidents = Object.freeze([
  { id: 'INC-2041', area: 'Gate D', severity: 'High', summary: 'Queue compression near priority lane', owner: 'Ops Alpha' },
  { id: 'INC-2042', area: 'Bay 112', severity: 'Medium', summary: 'Medical assistance requested', owner: 'Medic 2' },
  { id: 'INC-2043', area: 'Lot P3', severity: 'Low', summary: 'Directional signage issue', owner: 'Volunteer Team 4' }
]);

export const volunteers = Object.freeze([
  { name: 'Aarav', zone: 'Gate B', status: 'Available', response: '2 min' },
  { name: 'Lucia', zone: 'North Market', status: 'Assigned', response: '4 min' },
  { name: 'Mateo', zone: 'Gate D', status: 'Escalating', response: '1 min' },
  { name: 'Sara', zone: 'Medical M2', status: 'Available', response: '3 min' }
]);

export const alerts = Object.freeze([
  { icon: AlertTriangle, text: 'Gate D density above 90%. Open overflow lane and route families to Gate C.', tone: 'coral' },
  { icon: Radio, text: 'Volunteer Team 4 available for parking directional support.', tone: 'cyan' },
  { icon: ShieldAlert, text: 'Medical Point M2 response within SLA. Keep aisle 112 clear.', tone: 'mint' }
]);
