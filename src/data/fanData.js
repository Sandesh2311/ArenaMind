import BadgeHelp from 'lucide-react/dist/esm/icons/badge-help';
import Car from 'lucide-react/dist/esm/icons/car';
import Coffee from 'lucide-react/dist/esm/icons/coffee';
import MapPinned from 'lucide-react/dist/esm/icons/map-pinned';
import Ticket from 'lucide-react/dist/esm/icons/ticket';
import Waves from 'lucide-react/dist/esm/icons/waves';

export const fanTools = Object.freeze([
  { icon: Ticket, title: 'Seat Finder', detail: 'Section 214, Row H, Seat 18 via Gate B' },
  { icon: Car, title: 'Parking Assistant', detail: 'Lot P3 has 18% availability and fastest exit' },
  { icon: Coffee, title: 'Food Stall Finder', detail: 'North Market has 4 min average wait' },
  { icon: Waves, title: 'Washroom Finder', detail: 'Nearest family washroom: Level 2, Bay 207' },
  { icon: MapPinned, title: 'Emergency Exit Finder', detail: 'Exit E2 is 120 meters from your section' },
  { icon: BadgeHelp, title: 'Lost & Found', detail: 'Desk L1 near information kiosk, Gate C' }
]);

export const matchSchedule = Object.freeze([
  { time: '17:00', fixture: 'Brazil vs France', status: 'Gates open' },
  { time: '19:30', fixture: 'Opening ceremony', status: 'Stage checks' },
  { time: '20:00', fixture: 'Kickoff', status: 'On schedule' },
  { time: '21:00', fixture: 'Halftime', status: 'Concession surge expected' }
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
