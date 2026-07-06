import Languages from 'lucide-react/dist/esm/icons/languages';
import LocateFixed from 'lucide-react/dist/esm/icons/locate-fixed';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import Users from 'lucide-react/dist/esm/icons/users';

export const landingStats = Object.freeze([
  { label: 'Live Visitors', value: '73,420', trend: '+8.4%', tone: 'cyan' },
  { label: 'Avg Queue Time', value: '7.8 min', trend: '-3.1 min', tone: 'mint' },
  { label: 'Volunteer SLA', value: '96%', trend: '+5%', tone: 'gold' },
  { label: 'Fan Satisfaction', value: '4.8/5', trend: '+0.4', tone: 'coral' }
]);

export const features = Object.freeze([
  {
    icon: Users,
    title: 'Smart crowd management',
    description:
      'Predicts congestion, monitors gates and concourses, and recommends alternate routes before bottlenecks form.'
  },
  {
    icon: LocateFixed,
    title: 'Indoor navigation',
    description:
      'Guides fans and staff to seats, amenities, exits, parking, and operational zones with turn-by-turn route cards.'
  },
  {
    icon: ShieldAlert,
    title: 'Decision support AI',
    description:
      'Prioritizes incidents, recommends staffing moves, and summarizes high-risk conditions for command teams.'
  },
  {
    icon: Languages,
    title: 'Multilingual assistance',
    description:
      'Supports English, Hindi, Spanish, French, Portuguese, and Arabic conversations with offline fallback coverage.'
  }
]);

export const architectureLayers = Object.freeze([
  'Fan, Organizer, and Volunteer dashboards',
  'Hybrid AI orchestration with local FAQ router',
  'Gemini API for complex operational reasoning',
  'Venue telemetry simulation and analytics models',
  'Accessible React components deployed on Vercel'
]);

export const testimonials = Object.freeze([
  {
    quote:
      'ArenaMind gave our command center a single pane of glass for queues, incidents, and volunteer movement.',
    name: 'Tournament Operations Director'
  },
  {
    quote:
      'The assistant helped international fans find seats and amenities without adding pressure to stewards.',
    name: 'Guest Experience Lead'
  },
  {
    quote:
      'Risk prompts were practical, fast, and written in the language our on-ground teams actually use.',
    name: 'Venue Safety Officer'
  }
]);
