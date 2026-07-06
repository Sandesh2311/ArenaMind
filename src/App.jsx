import { lazy, Suspense, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { LandingPage } from './components/LandingPage.jsx';
import { RoleTabs } from './components/ui/RoleTabs.jsx';

const FanDashboard = lazy(() =>
  import('./components/dashboards/FanDashboard.jsx').then((module) => ({ default: module.FanDashboard }))
);
const OrganizerDashboard = lazy(() =>
  import('./components/dashboards/OrganizerDashboard.jsx').then((module) => ({ default: module.OrganizerDashboard }))
);
const VolunteerDashboard = lazy(() =>
  import('./components/dashboards/VolunteerDashboard.jsx').then((module) => ({ default: module.VolunteerDashboard }))
);

function DashboardRenderer({ activeRole, language, onLanguageChange }) {
  if (activeRole === 'organizer') {
    return <OrganizerDashboard language={language} onLanguageChange={onLanguageChange} />;
  }

  if (activeRole === 'volunteer') {
    return <VolunteerDashboard language={language} onLanguageChange={onLanguageChange} />;
  }

  return <FanDashboard language={language} onLanguageChange={onLanguageChange} />;
}

DashboardRenderer.propTypes = {
  activeRole: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export default function App() {
  const [activeRole, setActiveRole] = useState('fan');
  const [language, setLanguage] = useState('English');
  const handleRoleChange = useCallback((role) => setActiveRole(role), []);
  const handleLanguageChange = useCallback((value) => setLanguage(value), []);

  return (
    <div className="min-h-screen">
      <LandingPage />
      <section id="dashboards" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-arena-cyan">Role dashboards</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">One platform, three operational views.</h2>
            </div>
            <RoleTabs activeRole={activeRole} onChange={handleRoleChange} />
          </div>
          <Suspense
            fallback={
              <div className="glass rounded-lg p-5 text-sm text-slate-300" role="status">
                Loading dashboard...
              </div>
            }
          >
            <DashboardRenderer activeRole={activeRole} language={language} onLanguageChange={handleLanguageChange} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
