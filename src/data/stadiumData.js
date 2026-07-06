import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle';
import BadgeHelp from 'lucide-react/dist/esm/icons/badge-help';
import Car from 'lucide-react/dist/esm/icons/car';
import Coffee from 'lucide-react/dist/esm/icons/coffee';
import MapPinned from 'lucide-react/dist/esm/icons/map-pinned';
import Radio from 'lucide-react/dist/esm/icons/radio';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import Ticket from 'lucide-react/dist/esm/icons/ticket';
import Waves from 'lucide-react/dist/esm/icons/waves';

export const stats = Object.freeze([
  { label: 'Live Visitors', value: '73,420', trend: '+8.4%', tone: 'cyan' },
  { label: 'Avg Queue Time', value: '7.8 min', trend: '-3.1 min', tone: 'mint' },
  { label: 'Volunteer SLA', value: '96%', trend: '+5%', tone: 'gold' },
  { label: 'Fan Satisfaction', value: '4.8/5', trend: '+0.4', tone: 'coral' }
]);

export const fanTools = Object.freeze([
  { icon: Ticket, title: 'Seat Finder', detail: 'Section 214, Row H, Seat 18 via Gate B' },
  { icon: Car, title: 'Parking Assistant', detail: 'Lot P3 has 18% availability and fastest exit' },
  { icon: Coffee, title: 'Food Stall Finder', detail: 'North Market has 4 min average wait' },
  { icon: Waves, title: 'Washroom Finder', detail: 'Nearest family washroom: Level 2, Bay 207' },
  { icon: MapPinned, title: 'Emergency Exit Finder', detail: 'Exit E2 is 120 meters from your section' },
  { icon: BadgeHelp, title: 'Lost & Found', detail: 'Desk L1 near information kiosk, Gate C' }
]);

export const routeCards = Object.freeze([
  {
    from: 'Gate B',
    to: 'Section 214',
    duration: '6 min',
    steps: ['Enter Gate B security lane 3', 'Take escalator to Level 2', 'Turn right at Bay 208', 'Proceed 40 meters to Row H']
  },
  {
    from: 'Lot P3',
    to: 'Gate D',
    duration: '9 min',
    steps: ['Use blue pedestrian lane', 'Cross shuttle stop 2', 'Follow signs to Gate D priority queue', 'Keep left for family entry']
  },
  {
    from: 'Section 110',
    to: 'Medical Point M2',
    duration: '4 min',
    steps: ['Exit aisle toward Bay 112', 'Turn left at hydration kiosk', 'Continue to red medical signage', 'Report to M2 triage desk']
  }
]);

export const matchSchedule = Object.freeze([
  { time: '17:00', fixture: 'Brazil vs France', status: 'Gates open' },
  { time: '19:30', fixture: 'Opening ceremony', status: 'Stage checks' },
  { time: '20:00', fixture: 'Kickoff', status: 'On schedule' },
  { time: '21:00', fixture: 'Halftime', status: 'Concession surge expected' }
]);

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

export const volunteerTasks = Object.freeze([
  { title: 'Guide families from Gate B to Section 214', priority: 'High', due: 'Now' },
  { title: 'Translate Spanish fan request at info kiosk C', priority: 'Medium', due: '5 min' },
  { title: 'Check hydration station near Bay 110', priority: 'Low', due: '15 min' },
  { title: 'Report queue length at North Market', priority: 'Medium', due: '10 min' }
]);

export const alerts = Object.freeze([
  { icon: AlertTriangle, text: 'Gate D density above 90%. Open overflow lane and route families to Gate C.', tone: 'coral' },
  { icon: Radio, text: 'Volunteer Team 4 available for parking directional support.', tone: 'cyan' },
  { icon: ShieldAlert, text: 'Medical Point M2 response within SLA. Keep aisle 112 clear.', tone: 'mint' }
]);
