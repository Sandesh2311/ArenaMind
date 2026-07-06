export const APP_NAME = 'ArenaMind AI';
export const TAGLINE = 'AI Powered Smart Stadium Operations Platform';

export const ROLES = [
  { id: 'fan', label: 'Fan' },
  { id: 'organizer', label: 'Organizer' },
  { id: 'volunteer', label: 'Volunteer' }
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ar', label: 'Arabic' }
];

export const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const SYSTEM_CONTEXT =
  'You are ArenaMind AI, an enterprise stadium operations assistant for a FIFA-scale tournament venue. Give concise, safety-aware, multilingual guidance for fans, organizers, and volunteers.';
