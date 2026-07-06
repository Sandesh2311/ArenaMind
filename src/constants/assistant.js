export const ASSISTANT_EXAMPLES = Object.freeze([
  'Where is Gate B?',
  'Find my seat',
  'Nearest washroom',
  'Translate to Spanish',
  'What is the waiting time?',
  'Emergency near Gate D'
]);

export const STARTER_MESSAGES = Object.freeze({
  fan: 'Ask me about gates, seats, parking, food, washrooms, exits, or translation.',
  organizer: 'Ask for queue mitigation, incident triage, resource allocation, or emergency recommendations.',
  volunteer: 'Ask for task guidance, translation help, navigation, or escalation wording.'
});

export const ASSISTANT_FALLBACK_MESSAGE =
  'ArenaMind is temporarily unavailable. Please try again in a moment or ask a nearby stadium steward.';
