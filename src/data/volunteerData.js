import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Navigation from 'lucide-react/dist/esm/icons/navigation';
import Radio from 'lucide-react/dist/esm/icons/radio';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import { crowdZones, incidents } from './organizerAnalyticsData.js';
import { routeCards } from './fanData.js';

export { routeCards };

export const volunteerTasks = Object.freeze([
  { title: 'Guide families from Gate B to Section 214', priority: 'High', due: 'Now' },
  { title: 'Translate Spanish fan request at info kiosk C', priority: 'Medium', due: '5 min' },
  { title: 'Check hydration station near Bay 110', priority: 'Low', due: '15 min' },
  { title: 'Report queue length at North Market', priority: 'Medium', due: '10 min' }
]);

export const quickHelp = Object.freeze([
  { icon: ShieldAlert, label: 'Escalate emergency', detail: 'Send location, severity, and crowd condition to command.' },
  { icon: MessageSquare, label: 'Translation assistant', detail: 'Convert fan guidance into English, Hindi, Spanish, French, Portuguese, or Arabic.' },
  { icon: Navigation, label: 'Navigation', detail: 'Find fastest staff route to gate, bay, medical point, or lost and found.' },
  { icon: Radio, label: 'Communication panel', detail: 'Broadcast concise status updates to team channel.' }
]);

const highestRiskIncident = incidents.find((incident) => incident.severity === 'High');
const highestDensityZone = [...crowdZones].sort((zoneA, zoneB) => zoneB.density - zoneA.density).at(0);

export const volunteerAiGuidance = Object.freeze({
  priorities: [
    `Priority 1: support ${highestRiskIncident.area} because ${highestRiskIncident.summary.toLowerCase()} is active.`,
    `Priority 2: keep ${highestDensityZone.zone} moving; density is ${highestDensityZone.density}%.`,
    'Priority 3: assist multilingual visitors at information kiosk C before kickoff.'
  ],
  emergencyRouting: [
    'Use staff corridor S2 to reach Bay 112 without entering the main concourse queue.',
    'Guide fans away from Gate D toward Gate C when crowd compression is visible.',
    'Keep Medical Point M2 access clear for responders and wheelchair movement.'
  ],
  languageAssistance: [
    'Spanish visitors near kiosk C: offer gate, seat, and lost-and-found translations first.',
    'Hindi and Arabic prompts should use short directions with gate, level, bay, and landmark.',
    'Escalate any medical or safety translation to command after confirming the exact location.'
  ]
});
