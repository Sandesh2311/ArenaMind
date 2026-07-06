import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Navigation from 'lucide-react/dist/esm/icons/navigation';
import Radio from 'lucide-react/dist/esm/icons/radio';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
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
