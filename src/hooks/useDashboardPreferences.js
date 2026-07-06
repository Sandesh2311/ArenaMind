import { useCallback, useState } from 'react';
import { validateLanguage, validateRole } from '../utils/validation.js';

const DEFAULT_ROLE = 'fan';
const DEFAULT_LANGUAGE = 'English';

/**
 * Owns role and language preferences shared across all dashboard views.
 * @returns {{activeRole: string, language: string, handleRoleChange: Function, handleLanguageChange: Function}}
 */
export function useDashboardPreferences() {
  const [activeRole, setActiveRole] = useState(DEFAULT_ROLE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const handleRoleChange = useCallback((role) => setActiveRole(validateRole(role).value), []);
  const handleLanguageChange = useCallback((value) => setLanguage(validateLanguage(value).value), []);

  return { activeRole, language, handleRoleChange, handleLanguageChange };
}
